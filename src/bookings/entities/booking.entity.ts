import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from '../../users/entities/client.entity';
import { Store } from '../../books/entities/store.entity';
import { BookingBook } from './booking-book.entity';

@Entity({ name: 'bookings' })
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'details',
  })
  details: string;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'status',
  })
  status: string;

  @Column({
    type: 'date',
    nullable: false,
    name: 'date',
  })
  date: Date;

  @Column({
    type: 'float',
    nullable: false,
    name: 'total',
  })
  total: number;

  @ManyToOne(() => Client, (client) => client.bookings, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @ManyToOne(() => Store, (store) => store.bookings, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'store_id' })
  store: Store;

  @OneToMany(() => BookingBook, (bookingBook) => bookingBook.booking)
  bookingsBooks: Array<BookingBook>;
}
