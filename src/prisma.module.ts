import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import pagination from 'prisma-extension-pagination';

const createClient = async () => {
  // return new PrismaService({ datasources: { db: { url: dbStr } } });
};

const createPrismaExtended = (prisma: PrismaService) => {
  return prisma.$extends(pagination);
};

export type PrismaServiceExtended = ReturnType<typeof createPrismaExtended>;

@Module({
  providers: [
    PrismaService,
    {
      provide: 'PrismaClientExtended',
      inject: [PrismaService],
      useFactory: (prisma: PrismaService) => createPrismaExtended(prisma),
    },
  ],
  exports: [PrismaService, 'PrismaClientExtended'],
})
export class PrismaModule {}
