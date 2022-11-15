import { Test, TestingModule } from '@nestjs/testing';
import { ReturnsController } from './returns.controller';

describe('ReturnsController', () => {
  let controller: ReturnsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReturnsController],
    }).compile();

    controller = module.get<ReturnsController>(ReturnsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
