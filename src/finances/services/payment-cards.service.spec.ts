import { Test, TestingModule } from '@nestjs/testing';
import { PaymentCardsService } from './payment-cards.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PaymentCard } from '../entities/payment-card.entity';

describe('PaymentCardsService', () => {
  let service: PaymentCardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentCardsService,
        { provide: getRepositoryToken(PaymentCard), useValue: {} },
      ],
    }).compile();

    service = module.get<PaymentCardsService>(PaymentCardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
