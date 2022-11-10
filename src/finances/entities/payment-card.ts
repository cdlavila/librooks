import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Client } from '../../users/entities/client.entity';

@Entity({ name: 'payment_cards' })
export class PaymentCard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: false,
    name: 'name',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
    name: 'number',
  })
  number: string;

  @Column({
    type: 'date',
    nullable: false,
    unique: false,
    name: 'expiration_date',
  })
  expirationDate: Date;

  @Column({
    type: 'varchar',
    length: 4,
    nullable: false,
    unique: false,
    name: 'cvc',
  })
  cvc: string;

  @OneToOne(() => Client, (client) => client.paymentCards, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'client_id' })
  client: Client;
}
