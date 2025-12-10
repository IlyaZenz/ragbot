// src/auth/auth.controller.ts

import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UnauthorizedException,
  Get,
  UseGuards,
  Req,
  HttpStatus,
  HttpCode,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; // <-- Импорт AuthGuard
import { RegisterDto } from './register.dto';
import { AuthService } from './auth.service';
import express from 'express';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('registration')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async register(@Body() userData: RegisterDto) {
    const result = await this.authService.register(userData);
    return {
      statusCode: HttpStatus.CREATED, // 201 Created
      message: 'User registered successfully',
      data: result.user,
    };
  }
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(HttpStatus.OK) // <-- Явно указываем 200
  async login(@Req() req, @Res({ passthrough: true }) res: express.Response) {
    // Генерируем токен и получаем данные пользователя
    const { access_token, user } = await this.authService.login(req.user);

    res.cookie('jwt', access_token, {
      httpOnly: true, // Защита от XSS
      secure: process.env.NODE_ENV === 'production', // Только HTTPS в проде
      sameSite: 'lax', // Защита от CSRF
      maxAge: 3600000 * 24 * 7, // 7 дней
    });

    return {
      message: 'Login successful',
      user: { id: user.id, email: user.email, username: user.username },
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Req() req: express.Request) {
    return {
      message: 'Access granted!',
      user: req.user,
    };
  }
}
