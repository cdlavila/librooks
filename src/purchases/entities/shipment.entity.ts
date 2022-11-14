import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Purchase } from './purchase.entity';

@Entity({ name: 'shipments' })
export class Shipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
    name: 'tracking_number',
  })
  trackingNumber: string;

  @Column({
    type: 'enum',
    enum: ['En preparación', 'Enviado', 'Entregado'],
    default: 'En preparación',
    nullable: false,
    name: 'status',
  })
  status: 'En preparación' | 'Enviado' | 'Entregado';

  @OneToOne(() => Purchase, (purchase) => purchase.shipment, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'purchase_id' })
  purchase: Purchase;
}
