import { Injectable, Inject } from '@nestjs/common';
import { PrismaServiceExtended } from './prisma.module';

@Injectable()
export class AppService {
  constructor(
    @Inject('PrismaClientExtended') private prisma: PrismaServiceExtended,
  ) {
    console.log({ prisma });
  }
}
