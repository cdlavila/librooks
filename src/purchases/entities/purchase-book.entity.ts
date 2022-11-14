import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from '../../books/entities/book.entity';
import { Purchase } from './purchase.entity';

@Entity({ name: 'purchases_books' })
export class PurchaseBook {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'integer',
    nullable: false,
    name: 'quantity',
  })
  quantity: number;

  @ManyToOne(() => Book, (book) => book.bookingsBooks, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @ManyToOne(() => Purchase, (purchase) => purchase.purchasesBooks, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'purchase_id' })
  purchase: Purchase;
}
