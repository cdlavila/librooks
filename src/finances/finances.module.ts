import { Module } from '@nestjs/common';
import { PaymentCardsController } from './controllers/payment-cards.controller';
import { PaymentCardsService } from './services/payment-cards.service';
import { WalletsController } from './controllers/wallets.controller';
import { WalletsService } from './services/wallets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentCard } from './entities/payment-card.entity';
import { Wallet } from './entities/wallet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentCard, Wallet])],
  controllers: [PaymentCardsController, WalletsController],
  providers: [PaymentCardsService, WalletsService],
  exports: [WalletsService],
})
export class FinancesModule {}
