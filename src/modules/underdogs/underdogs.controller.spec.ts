import { Test, TestingModule } from '@nestjs/testing';
import { UnderdogsController } from './underdogs.controller';

describe('UnderdogsController', () => {
  let controller: UnderdogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnderdogsController],
    }).compile();

    controller = module.get<UnderdogsController>(UnderdogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
