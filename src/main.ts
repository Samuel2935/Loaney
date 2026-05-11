import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation for DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips unknown fields
      forbidNonWhitelisted: true, // throws error for extra fields
      transform: true, // auto transforms payload types
    }),
  );

  await app.listen(process.env.PORT ?? 5000);

  console.log(`API running on http://localhost:${process.env.PORT ?? 5000}`);
}

bootstrap();
