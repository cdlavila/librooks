import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Wallet } from '../../finances/entities/wallet.entity';
import { PaymentCard } from '../../finances/entities/payment-card.entity';

@Entity({ name: 'clients' })
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: false,
    name: 'first_name',
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: false,
    name: 'last_name',
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: false,
    name: 'place_of_birth',
  })
  placeOfBirth: string;

  @Column({
    type: 'date',
    nullable: false,
    unique: false,
    name: 'date_of_birth',
  })
  dateOfBirth: Date;

  @Column({
    type: 'enum',
    enum: ['Femenino', 'Masculino', 'Otro'],
    nullable: false,
    unique: false,
    name: 'gender',
  })
  gender: 'Femenino' | 'Masculino' | 'Otro';

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: false,
    name: 'address',
  })
  address: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
    name: 'news_subscriber',
  })
  newsSubscriber: boolean;

  @Column({
    type: 'json',
    nullable: false,
    unique: false,
    name: 'preferences',
  })
  preferences: Array<string>;

  @OneToOne(() => User, (user) => user.client, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Wallet, (wallet) => wallet.client, {
    nullable: true,
  })
  wallet: Wallet;

  @OneToMany(() => PaymentCard, (paymentCard) => paymentCard.client)
  paymentCards: Array<PaymentCard>;
}
