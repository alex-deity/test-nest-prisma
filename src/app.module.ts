import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma.module';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot(), PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
