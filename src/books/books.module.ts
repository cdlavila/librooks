import { Module } from '@nestjs/common';
import { BooksService } from './services/books.service';
import { BooksController } from './controllers/books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Store } from './entities/store.entity';
import { Stock } from './entities/stock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Store, Stock])],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}
