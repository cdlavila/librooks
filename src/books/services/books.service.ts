import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../entities/book.entity';
import { CreateBookDto, UpdateBookDto } from '../dtos/book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async create(data: CreateBookDto) {
    const newBook = await this.bookRepository.create(data);
    return this.bookRepository.save(newBook);
  }

  async findAll() {
    return this.bookRepository.find();
  }

  async findOne(id: string) {
    const book = await this.bookRepository.findOne({
      where: { id },
    });
    if (!book) {
      throw new NotFoundException(`Libro ${id} no encontrado`);
    }
    return book;
  }

  async update(id: string, payload: UpdateBookDto) {
    const book = await this.bookRepository.findOne({
      where: { id },
    });
    if (!book) {
      throw new NotFoundException(`Libro ${id} no encontrado`);
    }
    this.bookRepository.merge(book, payload);
    return this.bookRepository.save(book);
  }

  async delete(id: string) {
    const book = await this.bookRepository.findOne({
      where: { id },
    });
    if (!book) {
      throw new NotFoundException(`Libro ${id} no encontrado`);
    }
    return this.bookRepository.delete(id);
  }
}
