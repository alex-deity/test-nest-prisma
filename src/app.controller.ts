import { Controller, Inject } from '@nestjs/common';
import { PrismaServiceExtended } from './app.module';

@Controller()
export class AppController {
  constructor(@Inject('PrismaClientExtended') prisma: PrismaServiceExtended) {
    console.log('Prisma.environment', prisma.environment);
  }
}
