import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  app.setGlobalPrefix('auth');
  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(3001);
}
bootstrap();
