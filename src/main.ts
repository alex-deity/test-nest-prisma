import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { AppModule, PrismaService } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(3000);
}
bootstrap();
