import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Stock } from './stock.entity';
import { News } from '../../news/entities/news.entity';
import { BookingBook } from '../../bookings/entities/booking-book.entity';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
    name: 'title',
  })
  title: string;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'author',
  })
  author: string;

  @Column({
    type: 'enum',
    enum: ['Nuevo', 'Usado'],
    default: 'Nuevo',
    nullable: false,
    name: 'status',
  })
  status: 'Nuevo' | 'Usado';

  @Column({
    type: 'date',
    nullable: false,
    name: 'publication_date',
  })
  publicationDate: Date;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'issn',
  })
  issn: string;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'genre',
  })
  genre: string;

  @Column({
    type: 'integer',
    nullable: false,
    name: 'pages_number',
  })
  pagesNumber: number;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'language',
  })
  language: string;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'editorial',
  })
  editorial: string;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'photo',
  })
  photo: string;

  @Column({
    type: 'boolean',
    nullable: false,
    name: 'is_exhausted',
  })
  isExhausted: boolean;

  @Column({
    type: 'float',
    nullable: false,
    name: 'price',
  })
  price: number;

  @OneToMany(() => Stock, (stock) => stock.book)
  stocks: Array<Stock>;

  @OneToOne(() => News, (news) => news.book)
  news: News;

  @OneToMany(() => BookingBook, (bookingBook) => bookingBook.book)
  bookingsBooks: Array<BookingBook>;
}
