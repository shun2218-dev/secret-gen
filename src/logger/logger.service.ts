import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { createLogger, format, Logger, transports } from 'winston';

@Injectable()
export class LoggerService {
  private logger: Logger;
  private logFilePath: string;

  constructor() {
    const logDir = join(__dirname, '..', 'logs');
    if (!existsSync(logDir)) {
      mkdirSync(logDir, { recursive: true });
    }

    this.logFilePath = join(logDir, `log_${this.getCurrentDate()}.log`);

    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp({ format: 'YYY-MM-DD HH:mm:ss' }),
        format.printf(
          ({ timestamp, level, message }) =>
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            `[${timestamp}] ${level.toUpperCase()}: ${message}`,
        ),
      ),
      transports: [
        new transports.Console(),
        new transports.File({
          filename: this.logFilePath,
          level: 'info',
          silent: false,
        }),

        new transports.File({ filename: 'debug.log', level: 'debug' }),
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string) {
    this.logger.error(message);
  }

  warn(message: string) {
    this.logger.warn(message);
  }
  debug?(message: string) {
    this.logger.debug(message);
  }

  verbose?(message: string) {
    this.logger.verbose(message);
  }

  getLogFilePath(): string {
    const logDir = join(__dirname, '..', 'logs');
    console.log('getLogFilePath');
    return join(logDir, `log_${this.getCurrentDate()}.log`);
  }

  getCurrentDate(): string {
    const now = new Date();
    console.log('getCurrentDate');
    return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
  }
}
