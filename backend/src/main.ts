import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    // 2. Указываем, какие источники разрешены
    origin: 'http://localhost:5173',

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
