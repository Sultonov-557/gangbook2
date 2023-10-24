import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './common/config/env.config';
import * as hash from './common/util/hash.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(env.PORT, () => {
    console.log(`server running on http://127.0.0.1:${env.PORT}`);
  });
}
bootstrap();
