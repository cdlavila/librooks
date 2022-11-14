import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Book } from '../../books/entities/book.entity';

export class CreateNewsDto {
  @IsDate({ message: 'Debe ser una fecha valida' })
  @IsNotEmpty({ message: 'La fecha de publicación es requerida' })
  readonly date: Date;

  @IsString({ message: 'Debe ser un texto valido' })
  @IsNotEmpty({ message: 'La descripción en la noticia es requerida' })
  readonly description: string;

  @IsUUID('4', { message: 'El id del libro debe ser un UUID' })
  @IsNotEmpty({ message: 'El id del libro es obligatorio' })
  readonly book: Book;
}

export class UpdateNewsDto extends PartialType(CreateNewsDto) {}
