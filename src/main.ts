import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './common/config/env.config';
import { ValidationPipe } from '@nestjs/common';
import { config } from './common/config/swagger.config';
import { SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/http/errorhandler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(env.PORT, () => {
    console.log(`server running on http://127.0.0.1:${env.PORT}`);
  });
}
bootstrap();
