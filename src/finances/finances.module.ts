import { Module } from '@nestjs/common';
import { PaymentCardsController } from './controllers/payment-cards.controller';
import { PaymentCardsService } from './services/payment-cards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentCard } from './entities/payment-card';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentCard])],
  controllers: [PaymentCardsController],
  providers: [PaymentCardsService],
})
export class FinancesModule {}
