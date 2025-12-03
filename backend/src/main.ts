import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const isProduction = process.env.NODE_ENV === 'production';
  const allowedOrigins = isProduction
    ? [
        // 1. Укажите ваш домен Vercel здесь (ОБЯЗАТЕЛЬНО)
        'https://my-ragbot-frontend.vercel.app', // Замените на ваш реальный домен!
        // 2. Если вы еще используете локальный фронтенд
        'http://localhost:5173',
      ]
    : ['http://localhost:5173', 'http://localhost:3000'];
  app.enableCors({
    // 2. Указываем, какие источники разрешены

    origin: allowedOrigins,

    // 3. Разрешенные методы (POST, GET, PUT, DELETE)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',

    // 4. Разрешенные заголовки (особенно важно для JWT, где мы передаем Authorization)
    allowedHeaders: 'Content-Type, Accept, Authorization',

    // 5. Разрешаем передачу куки и учетных данных (если это потребуется позже)
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
