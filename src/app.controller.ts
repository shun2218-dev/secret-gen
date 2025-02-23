import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { DEFAULT_LENGTH } from './constants';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getSecret(
    @Query('len', new DefaultValuePipe(DEFAULT_LENGTH), ParseIntPipe)
    len?: number,
  ): { result: string } {
    const result = this.appService.generateSecret(len);
    return { result };
  }
}
