import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation for DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  //  Enable CORS for all origins (you can restrict this in production)

  // app.enableCors({
  //   origin: '*', // tighten later
  //   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  //   credentials: true,
  // });
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(','),
    credentials: true,
  });
  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Loaney API')
    .setDescription('Loan management system API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 5000);

  console.log(`API running on http://localhost:${process.env.PORT ?? 5000}`);

  console.log(
    `Swagger docs running on http://localhost:${process.env.PORT ?? 5000}/docs`,
  );
}

bootstrap();
