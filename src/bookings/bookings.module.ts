import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { BookingBook } from './entities/booking-book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, BookingBook])],
})
export class BookingsModule {}
