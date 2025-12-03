// src/auth/jwt.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';// <-- Импорт ключа
import { jwtSecret } from 'src/config/auth.config';

// Определяем, какие данные мы ожидаем внутри JWT
export interface JwtPayload {
  sub: string; // ID пользователя (используется для поиска в БД)
  email: string;
}

@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') { 
  constructor(private prisma: PrismaService) {
    super({

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
      

      secretOrKey: jwtSecret, 

      ignoreExpiration: false, 
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: { 
        id: true, 
        email: true, 
        username: true 
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }
    
    return user; 
  }
}