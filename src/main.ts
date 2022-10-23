import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      //Stripping out the excess properties in the body, that are not used in the DTO
      whitelist: true,
    }),
  );
  await app.listen(8000);
}
bootstrap();
