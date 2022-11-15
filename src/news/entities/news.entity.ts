import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Book } from '../../books/entities/book.entity';

@Entity({ name: 'news' })
export class News {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'date',
    nullable: false,
    unique: false,
    name: '',
  })
  date: Date;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: false,
    name: 'description',
  })
  description: string;

  @OneToOne(() => Book, (book) => book.news, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'book_id' })
  book: Book;
}
