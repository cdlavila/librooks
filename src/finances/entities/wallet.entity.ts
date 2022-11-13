import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Client } from '../../users/entities/client.entity';

@Entity({ name: 'wallets' })
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'float',
    nullable: false,
    unique: false,
    name: 'balance',
  })
  balance: number;

  @OneToOne(() => Client, (client) => client.wallet, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'client' })
  client: Client;
}
