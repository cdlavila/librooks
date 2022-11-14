import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Stock } from './stock.entity';
import { Booking } from '../../bookings/entities/booking.entity';

@Entity({ name: 'stores' })
export class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
    name: 'name',
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'address',
  })
  address: string;

  @Column({
    type: 'json',
    nullable: false,
    name: 'coordinates',
  })
  coordinates: { latitude: number; longitude: number };

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'photo',
  })
  photo: string;

  @OneToMany(() => Stock, (stock) => stock.store)
  stocks: Array<Stock>;

  @OneToMany(() => Booking, (booking) => booking.store)
  bookings: Array<Booking>;
}
