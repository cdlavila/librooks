import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { PurchaseBook } from './entities/purchase-book.entity';
import { Return } from './entities/return.entity';
import { Shipment } from './entities/shipment.entity';
import { PurchasesController } from './controllers/purchases.controller';
import { PurchasesService } from './services/purchases.service';
import { ReturnsService } from './services/returns.service';
import { ReturnsController } from './controllers/returns.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Purchase, PurchaseBook, Return, Shipment]),
  ],
  controllers: [PurchasesController, ReturnsController],
  providers: [PurchasesService, ReturnsService],
})
export class PurchasesModule {}
