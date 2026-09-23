import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto.js';
import { UpdateAuthDto } from './dto/update-auth.dto.js';
import { UsersService } from '../users/users.service.js';
import { User } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { JwtAccessPayload, RefreshTokenPayload } from './types/jwt-passport.type.js';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcryptjs';
import type { StringValue } from 'ms';


export interface LoginContext {
  ipAddress?: string
}

@Injectable()
export class AuthService {

  constructor(
    private readonly userServices: UsersService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService
  ) { }

  async login(email: string, password: string, context: LoginContext = {}) {
    // Check if user exists in db
    const user: any = await this.userServices.findByEmail(email);

    //console.log("user", user);

    if (!user) {
      throw new BadRequestException("Invalid Credential");
    }

    // Check user Status
    if (user.status !== "ACTIVE") {
      throw new ForbiddenException("This account is not Active. Please Contact Your System Admin. ");
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new BadRequestException("Invalid Credential");
    }

    // Access token and refresh token
    const tokens = await this.issueTokenPair(user, context);
    return {
      ...tokens,
      userType: user.userType,

    };
  }

  async issueTokenPair(user: User, context: LoginContext = {}) {
    // Rerfresh Token Expired At
    const expiredAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

    // Session  
    const session = await this.prisma.userSession.create({
      data: {
        userId: user.id,
        deviceLabel: "Untitled",
        ipAddress: context?.ipAddress! as string,
        refreshTokenHash: "",
        expiresAt: expiredAt
      }
    })
    const accessTokenPayload: JwtAccessPayload = {
      userId: user.id,
      email: user.email,
      userType: user.userType,
      sid: session.id
    }


    const refreshTokenPayload: RefreshTokenPayload = {
      userId: user.id,
      sessionId: session.id
    }

    // Create Tokens
    const [accessToken, refreshToken] = await Promise.all([
      // Access Token
      this.jwtService.sign(accessTokenPayload, {
        secret: this.config.getOrThrow<string>("JWT_SECRET"),
        expiresIn: this.config.get<StringValue>("JWT_ACCESS_EXPIRY", "15m")
      }),

      // Refresh Token
      this.jwtService.sign(refreshTokenPayload, {
        secret: this.config.getOrThrow<string>("JWT_REFRESH_SECRET"),
        expiresIn: this.config.get<StringValue>("JWT_REFRESH_EXPIRY", "7d")
      })
    ])

    const refreshTokenHash = await bcrypt.hash(refreshToken, 10)

    // Update in DB
    await this.prisma.userSession.update({
      where: {
        id: session.id
      },
      data: {
        refreshTokenHash: refreshTokenHash
      }
    })



    return {
      accessToken,
      refreshToken
    }
  }


  private async passwirdMatches(user:User | null, password:string):Promise<void> {
  const hash = user?.passwordHash as string;
  const matches = await bcrypt.compare(password,hash);

  if(!user || !matches){
    throw new UnauthorizedException("Invalid Email or Password")
  }
 
  }

  async me(userId:string)
  {
    const data:any = await this.prisma.user.findUnique({
      where:{
        id:userId
      }
    })

    const {passwordHash,twoFactorSecret, ...rest} = data;

    return rest;
  }
}
