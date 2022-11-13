import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateNewsDto {
  @IsDate({ message: 'Debe ser una fecha valida' })
  @IsNotEmpty({ message: 'La fecha de publicacion es requerida' })
  readonly date: Date;
  @IsString({ message: 'Debe ser un texto valido' })
  @IsNotEmpty({ message: 'La descripcion en la noticia es requerida' })
  readonly description: string;
}

export class UpdateNewsDto extends PartialType(CreateNewsDto) {}
