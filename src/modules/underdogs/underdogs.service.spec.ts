import { Test, TestingModule } from '@nestjs/testing';
import { UnderdogsService } from './underdogs.service';

describe('UnderdogsService', () => {
  let service: UnderdogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnderdogsService],
    }).compile();

    service = module.get<UnderdogsService>(UnderdogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});