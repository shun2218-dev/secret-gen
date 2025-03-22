import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { readdir, stat, unlink } from 'node:fs';
import { join } from 'node:path';

@Injectable()
export class LogCleanerService {
  private logDir = join(__dirname, '..', 'logs');
  private retentionDays = 15;

  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  cleanOldLogs() {
    const now = new Date().getTime();

    readdir(this.logDir, (err, files) => {
      if (err) {
        console.error('Failed to load logfile', err);
        return;
      }

      files.forEach((file) => {
        const filePath = join(this.logDir, file);
        stat(filePath, (err, stats) => {
          if (err) {
            console.error('Failed to get file info', err);
            return;
          }

          const fileAge = now - stats.mtime.getTime();
          const retentionMs = this.retentionDays * 24 * 60 * 60 * 1000;

          if (fileAge > retentionMs) {
            unlink(filePath, (err) => {
              if (err) {
                console.error('Failed to delete logfile', err);
                return;
              } else {
                console.log(`Delete: ${filePath}`);
              }
            });
          }
        });
      });
    });
  }
}
