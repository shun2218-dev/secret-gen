import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { existsSync, readdir } from 'node:fs';
import { join } from 'node:path';

@Controller('log')
export class LogController {
  private logDir = join(__dirname, '..', 'logs');

  @Get(':filename')
  downloadLog(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(this.logDir, filename);

    if (!existsSync(filePath)) {
      return res.status(404).send('Log file not found');
    }

    res.download(filePath);
  }

  @Get()
  listLogs(@Res() res: Response) {
    readdir(this.logDir, (err, files) => {
      if (err) {
        return res.status(500).send('Error retrieving logs');
      }

      res.json(files);
    });
  }
}
