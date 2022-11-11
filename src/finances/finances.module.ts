import { Module } from '@nestjs/common';
import { PaymentCardsController } from './controllers/payment-cards.controller';
import { PaymentCardsService } from './services/payment-cards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentCard } from './entities/payment-card.entity';
import { Wallet } from './entities/wallet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentCard, Wallet])],
  controllers: [PaymentCardsController],
  providers: [PaymentCardsService],
})
export class FinancesModule {}
