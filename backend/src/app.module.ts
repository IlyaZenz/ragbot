import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';

@Module({
  
  imports: [PrismaModule,AuthModule,ConfigModule.forRoot({
      isGlobal: true, 
    }),],
  controllers: [AppController],
  providers: [AppService,AuthService],
})
export class AppModule {}
