import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      // whitelist: true,
      // forbidNonWhitelisted: true,
      // transform: true,
    }),
  );
  await app.listen(process.env.PORT || 3000);
}
bootstrap().then(() => {
  console.log(
    `Server started on: http://localhost:${process.env.PORT || 3000},`,
    `ENV: ${process.env.NODE_ENV}`,
  );
});
