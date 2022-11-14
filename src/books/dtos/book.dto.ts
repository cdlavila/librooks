import {
  IsNotEmpty,
  IsString,
  IsIn,
  IsDate,
  MaxDate,
  IsNumber,
  IsUrl,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';

export class CreateBookDto {
  @IsString({ message: 'El campo título debe ser un texto' })
  @IsNotEmpty({ message: 'El campo título es obligatorio' })
  readonly title: string;

  @IsString({ message: 'El campo autor debe ser un texto' })
  @IsNotEmpty({ message: 'El campo autor es obligatorio' })
  readonly author: string;

  @IsIn(['Nuevo', 'Usado'], {
    message: 'El campo estado no es válido',
  })
  @IsNotEmpty({ message: 'El campo estado es obligatorio' })
  readonly status: 'Nuevo' | 'Usado';

  @MaxDate(new Date(), {
    message: 'La fecha de publicación no puede ser mayor a la fecha actual',
  })
  @IsDate({
    message: 'El campo fecha de publicación debe ser una fecha válida',
  })
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty({ message: 'El campo fecha de publicación es obligatorio' })
  readonly publicationDate: Date;

  @IsString({ message: 'El campo ISSN debe ser un texto' })
  @IsNotEmpty({ message: 'El campo ISSN es obligatorio' })
  readonly issn: string;

  @IsString({ message: 'El campo género debe ser un texto' })
  @IsNotEmpty({ message: 'El campo género es obligatorio' })
  readonly genre: string;

  @IsNumber({}, { message: 'El campo número de páginas debe ser un número' })
  @IsNotEmpty({ message: 'El campo número de páginas es obligatorio' })
  readonly pagesNumber: number;

  @IsString({ message: 'El campo lenguaje debe ser un texto' })
  @IsNotEmpty({ message: 'El campo lenguaje es obligatorio' })
  readonly language: string;

  @IsString({ message: 'El campo editorial debe ser un texto' })
  @IsNotEmpty({ message: 'El campo editorial es obligatorio' })
  readonly editorial: string;

  @IsUrl({}, { message: 'El campo foto debe ser una url válida' })
  @IsNotEmpty({ message: 'El campo foto es obligatorio' })
  readonly photo: string;

  @IsNumber({}, { message: 'El campo precio debe ser un número' })
  @IsNotEmpty({ message: 'El campo precio es obligatorio' })
  readonly price: number;
}

export class UpdateBookDto extends PartialType(CreateBookDto) {}
