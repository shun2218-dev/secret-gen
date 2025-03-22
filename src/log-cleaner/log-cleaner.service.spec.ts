import { Test, TestingModule } from '@nestjs/testing';
import { LogCleanerService } from './log-cleaner.service';

describe('LogCleanerService', () => {
  let service: LogCleanerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogCleanerService],
    }).compile();

    service = module.get<LogCleanerService>(LogCleanerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
