import { JwtService } from '@nestjs/jwt'; 
import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
const bcrypt = require('bcryptjs');
import { RegisterDto } from './register.dto';

@Injectable()
export class AuthService {
  // Внедряем JwtService
  constructor(private prisma: PrismaService, private jwtService: JwtService) {} 

async register(userData: RegisterDto) {
    const { username, email, password } = userData;
    
    // 1. Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      // 2. Сохранение пользователя в БД
      const user = await this.prisma.user.create({
        data: {
          username, 
          email,
          password: hashedPassword, // Сохраняем хеш, а не сам пароль
        },
        // Возвращаем только безопасные данные
        select: {
          id: true,
          username: true,
          email: true,
        },
      });

      return { message: 'Registration successful', user };

    } catch (error) {
      console.log(process.env.DATABASE_URL)
      console.error("Prisma error during registration:", error);
      if (error.code === 'P2002') {
        // Определяем, какое поле вызвало конфликт (email или username)
        const target = error.meta.target.includes('email') ? 'Email' : 'Username';
        
        throw new ConflictException(`${target} is already taken.`);
      }
      
      // Другие ошибки сервера
      throw new InternalServerErrorException('Server error during registration.');
    }
  }

  // НОВЫЙ МЕТОД: Валидация пользователя (используется для входа)
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      return null;
    }

    // Сравнение хешированных паролей
    const isMatch = await bcrypt.compare(pass, user.password);

    if (isMatch) {
      // Возвращаем пользователя, исключая пароль
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // НОВЫЙ МЕТОД: Вход и генерация токена
  async login(user: any) {
    // payload - данные, которые мы записываем в токен (обычно id пользователя)
    const payload = { 
        email: user.email, 
        sub: user.id, // 'sub' (subject) - стандартное поле JWT
    };

    return {
      access_token: this.jwtService.sign(payload), // Генерация токена
      user: { id: user.id, email: user.email, username: user.username }
    };
  }
}