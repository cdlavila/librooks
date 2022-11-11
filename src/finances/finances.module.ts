import { Module } from '@nestjs/common';
import { PaymentCardsController } from './controllers/payment-cards.controller';
import { PaymentCardsService } from './services/payment-cards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentCardEntity } from './entities/payment-card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentCardEntity])],
  controllers: [PaymentCardsController],
  providers: [PaymentCardsService],
})
export class FinancesModule {}
