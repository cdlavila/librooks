import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Purchase } from './purchase.entity';

@Entity({ name: 'returns' })
export class Return {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: [
      'Producto en mal estado',
      'Producto no llenó las expectativas',
      'Producto entregado en un tiempo superior al estipulado',
    ],
    nullable: false,
    name: 'reason',
  })
  reason:
    | 'Producto en mal estado'
    | 'Producto no llenó las expectativas'
    | 'Producto entregado en un tiempo superior al estipulado';

  @Column({
    type: 'text',
    nullable: false,
    name: 'details',
  })
  details: string;

  @Column({
    type: 'enum',
    enum: ['En revisión', 'Aprobado', 'Rechazado'],
    default: 'En revisión',
    nullable: false,
    name: 'status',
  })
  status: 'En revisión' | 'Aprobado' | 'Rechazado';

  @OneToOne(() => Purchase, (purchase) => purchase.return, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'purchase_id' })
  purchase: Purchase;
}
