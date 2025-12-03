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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; // <-- Импорт AuthGuard
import express from 'express'; // Для доступа к req.user
import { RegisterDto } from './register.dto';
import { AuthService } from './auth.service';

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

  // НОВЫЙ ЗАЩИЩЕННЫЙ МАРШРУТ: GET /auth/profile
  @UseGuards(AuthGuard('jwt')) // <-- ГВАРД ЗАЩИЩАЕТ МАРШРУТ
  @Get('profile')
  getProfile(@Req() req: express.Request) {
    // Если гвард прошел, то req.user содержит данные,
    // возвращенные из JwtStrategy.validate()

    return {
      message: 'Access granted!',
      user: req.user,
    };
  }
}
