import { JwtService } from '@nestjs/jwt';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
const bcrypt = require('bcryptjs');
import { RegisterDto } from './register.dto';
import { Prisma } from 'generated/prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(userData: RegisterDto) {
    const { username, email, password } = userData;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await this.prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
        select: {
          id: true,
          username: true,
          email: true,
        },
      });

      return { message: 'Registration successful', user };
    } catch (error) {
      console.log(process.env.DATABASE_URL);
      console.error('Prisma error during registration:', error);

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        // Безопасно определяем, какое поле вызвало конфликт
        const targets = Array.isArray(error.meta?.target)
          ? (error.meta.target as string[])
          : [];

        let targetField = '';
        if (targets.includes('email')) {
          targetField = 'Email';
        } else if (targets.includes('username')) {
          targetField = 'Username';
        }

        if (targetField) {
          throw new ConflictException(`${targetField} is already taken.`);
        }
      }

      // Другие ошибки сервера
      throw new InternalServerErrorException(
        'Server error during registration.',
      );
    }
  }

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

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user.id, email: user.email, username: user.username },
    };
  }
}
