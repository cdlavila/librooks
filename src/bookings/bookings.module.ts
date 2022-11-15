import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { BookingBook } from './entities/booking-book.entity';
import { BookingsService } from './services/bookings.service';
import { BookingsController } from './controllers/bookings.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, BookingBook])],
  providers: [BookingsService],
  controllers: [BookingsController],
})
export class BookingsModule {}
