import {
  INestApplication,
  Injectable,
  Module,
  OnModuleInit,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaClient } from '@prisma/client';

const dbStr = 'file:./dev.db';

const createPrismaExtended = (prisma: PrismaService) => {
  // TODO: uncomment the following line to "fix" the app WITH the ScheduleModule import (line 43)
  // return prisma;
  return prisma.$extends({
    model: { environment: { async signUp(email: string) {} } },
  });
};

export type PrismaServiceExtended = ReturnType<typeof createPrismaExtended>;

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({ datasources: { db: { url: dbStr } } });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}

@Module({
  imports: [
    // TODO: Comment the following line to "fix" the app WITH the Extended Prisma Client (line 15)
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    PrismaService,
    {
      provide: 'PrismaClientExtended',
      inject: [PrismaService],
      useFactory: (prisma: PrismaService) => createPrismaExtended(prisma),
    },
  ],
})
export class AppModule {}
