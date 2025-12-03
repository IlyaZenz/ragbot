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
// Указываем, что это JWT-стратегия с именем 'jwt'
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') { 
  constructor(private prisma: PrismaService) {
    super({
      // 1. Как извлекать токен: из заголовка Authorization (Bearer token)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
      
      // 2. Использовать тот же секретный ключ
      secretOrKey: jwtSecret, 
      
      // 3. Отключаем проверку срока годности токена на всякий случай
      // (В продакшене лучше оставить true)
      ignoreExpiration: false, 
    });
  }

  // Метод 'validate' выполняется после успешной расшифровки токена
  async validate(payload: JwtPayload) {
    // Ищем пользователя по ID, который мы записали в 'sub'
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
    
    // Если пользователь найден, Passport добавляет этот объект 
    // к объекту запроса (req.user)
    return user; 
  }
}