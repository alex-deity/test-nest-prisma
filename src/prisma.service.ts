import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const dbStr = 'file:./dev.db';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({ datasources: { db: { url: dbStr } } });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('PrismaService onModuleInit');
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
