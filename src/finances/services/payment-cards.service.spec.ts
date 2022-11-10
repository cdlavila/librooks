import { Test, TestingModule } from '@nestjs/testing';
import { PaymentCardsService } from './payment-cards.service';

describe('PaymentCardsService', () => {
  let service: PaymentCardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentCardsService],
    }).compile();

    service = module.get<PaymentCardsService>(PaymentCardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
