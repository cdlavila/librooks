import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '../entities/booking.entity';
import { UpdateBookingDto } from '../dtos/booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async findAll() {
    return await this.bookingRepository.find({
      relations: ['client'],
    });
  }

  async update(id: string, changes: UpdateBookingDto) {
    const booking = await this.bookingRepository.findOne({
      where: { id },
    });
    if (!booking) {
      throw new NotFoundException(`Booking ${id} not found`);
    }
    this.bookingRepository.merge(booking, changes);
    return this.bookingRepository.save(booking);
  }
}
