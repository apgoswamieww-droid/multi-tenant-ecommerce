import { Controller, Get, Post, Body, Patch, Param, Delete, Ip, HttpCode, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateAuthDto } from './dto/create-auth.dto.js';
import { UpdateAuthDto } from './dto/update-auth.dto.js';
import { LoginDTO } from './dto/login.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { CurrentUser } from '../common/decorators/current-user.decorators.js';
import { type JwtAccessPayload } from './types/jwt-passport.type.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("/login")
  @HttpCode(200)
  login(@Body() loginDTO: LoginDTO, @Ip() ip: string) {
    return this.authService.login(
      loginDTO.email,
      loginDTO.password,
      {
        ipAddress: ip
      }
    );
  }

  @Get("/me")
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user:JwtAccessPayload){
    console.log("user", user)
    const data = await this.authService.me(user.userId);

    return data
  }

  
}
