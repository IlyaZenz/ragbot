// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport'; 
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { accessTokenExpiresInTime, jwtSecret } from 'src/config/auth.config';

// Мы добавим JwtStrategy позже, пока импортируем только токен

@Module({
  imports: [
    PrismaModule,
    PassportModule, 
    JwtModule.register({
      secret: jwtSecret, 
      signOptions: { expiresIn: accessTokenExpiresInTime },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
  ],
  exports: [AuthService, JwtModule], 
})
export class AuthModule {}