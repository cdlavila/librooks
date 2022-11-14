import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from '../../users/entities/client.entity';
import { Store } from '../../books/entities/store.entity';
import { PurchaseBook } from './purchase-book.entity';
import { Shipment } from './shipment.entity';
import { Return } from './return.entity';

@Entity({ name: 'purchases' })
export class Purchase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
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

  @Column({
    type: 'enum',
    enum: ['Recogida en tienda', 'Envío a domicilio'],
    default: 'Envío a domicilio',
    nullable: false,
    name: 'delivery_method',
  })
  deliveryMethod: 'Recogida en tienda' | 'Envío a domicilio';

  @ManyToOne(() => Client, (client) => client.purchases, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @ManyToOne(() => Store, (store) => store.purchases, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'store_id' })
  store: Store;

  @OneToMany(() => PurchaseBook, (purchaseBook) => purchaseBook.purchase)
  purchasesBooks: Array<PurchaseBook>;

  @OneToOne(() => Shipment, (shipment) => shipment.purchase, {
    nullable: true,
  })
  shipment: Shipment;

  @OneToOne(() => Return, (r) => r.purchase, {
    nullable: true,
  })
  return: Return;
}
