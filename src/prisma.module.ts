import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
// import pagination from 'prisma-extension-pagination';

const createClient = async () => {
  // return new PrismaService({ datasources: { db: { url: dbStr } } });
};

const createPrismaExtended = () => {
  //return createClient().$extends(pagination);
};

export type PrismaServiceExtended = ReturnType<typeof createPrismaExtended>;

@Module({
  providers: [
    PrismaService /*{
    provide: 'PrismaClientExtended',
    useFactory: () => createPrismaExtended(),
  }, */,
  ],
  exports: [PrismaService],
})
export class PrismaModule {}
