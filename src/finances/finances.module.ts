import { Module } from '@nestjs/common';
import { PaymentCardsController } from './controllers/payment-cards.controller';
import { PaymentCardsService } from './services/payment-cards.service';

@Module({
  providers: [PaymentCardsService],
  controllers: [PaymentCardsController],
})
export class FinancesModule {}
