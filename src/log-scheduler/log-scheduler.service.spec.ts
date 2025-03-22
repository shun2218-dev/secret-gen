import { Test, TestingModule } from '@nestjs/testing';
import { LogSchedulerService } from './log-scheduler.service';

describe('LogSchedulerService', () => {
  let service: LogSchedulerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogSchedulerService],
    }).compile();

    service = module.get<LogSchedulerService>(LogSchedulerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
