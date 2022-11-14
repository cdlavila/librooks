import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Book } from './book.entity';
import { Store } from './store.entity';

@Entity({ name: 'stocks' })
export class Stock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'number',
    nullable: false,
    name: 'quantity',
  })
  quantity: number;

  @ManyToOne(() => Book, (book) => book.stocks, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @ManyToOne(() => Store, (store) => store.stocks, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'store_id' })
  store: Store;
}
