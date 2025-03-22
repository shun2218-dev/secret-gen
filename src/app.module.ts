import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
// import { WinstonModule } from 'nest-winston';
// import { format, transports } from 'winston';
import { LoggerService } from './logger/logger.service';
import { LogController } from './log/log.controller';
import { LogSchedulerService } from './log-scheduler/log-scheduler.service';
import { ScheduleModule } from '@nestjs/schedule';
import { LogCleanerService } from './log-cleaner/log-cleaner.service';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController, LogController],
  providers: [
    AppService,
    LoggerService,
    LogSchedulerService,
    LogCleanerService,
  ],
})
export class AppModule {}
