import { Test, TestingModule } from '@nestjs/testing';
import { PaymentCardsController } from './payment-cards.controller';

describe('PaymentCardsController', () => {
  let controller: PaymentCardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentCardsController],
    }).compile();

    controller = module.get<PaymentCardsController>(PaymentCardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
