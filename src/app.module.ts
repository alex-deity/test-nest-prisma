import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [
    PrismaModule,
    // ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
