import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';

import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter() as any);
  await app.listen(3000);
}
bootstrap();
