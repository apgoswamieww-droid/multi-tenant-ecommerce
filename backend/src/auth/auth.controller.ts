import { Controller, Get, Post, Body, Patch, Param, Delete, Ip, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateAuthDto } from './dto/create-auth.dto.js';
import { UpdateAuthDto } from './dto/update-auth.dto.js';
import { LoginDTO } from './dto/login.dto.js';

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

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
