import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { PurchaseBook } from './entities/purchase-book.entity';
import { Return } from './entities/return.entity';
import { Shipment } from './entities/shipment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Purchase, PurchaseBook, Return, Shipment]),
  ],
})
export class PurchasesModule {}
