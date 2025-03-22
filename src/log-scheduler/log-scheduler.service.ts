import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class LogSchedulerService {
  constructor(private readonly logger: LoggerService) {}

  formatTimestamp(num: number): string {
    return num.toString().padStart(2, '0');
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  handleCron() {
    const now = new Date();
    const timestamp = `${now.getFullYear()}/${this.formatTimestamp(now.getMonth() + 1)}/${this.formatTimestamp(now.getDate())} ${this.formatTimestamp(now.getHours())}:${this.formatTimestamp(now.getMinutes())}:${this.formatTimestamp(now.getSeconds())}`;
    this.logger.log(`Created a new logfile at ${timestamp}`);
  }
}
