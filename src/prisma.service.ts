import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

const dbStr =
  'postgresql://postgres:dps_password@localhost:5432/dpws?schema=public';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>
  implements OnModuleInit
{
  constructor() {
    super({
      log: [
        { emit: 'event', level: 'error' },
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'warn' },
      ],
      datasources: { db: { url: dbStr } },
    });

    this.$on('query', (event: any) => {
      console.log(
        { params: event.params, duration: event.duration },
        event.query,
      );
    });

    this.$on('info', (event: any) => {
      console.log(event.message);
    });

    this.$on('error', (event: any) => {
      console.log(event.message);
    });

    this.$on('warn', (event: any) => {
      console.log(event.message);
    });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('PrismaService onModuleInit');
  }
}
