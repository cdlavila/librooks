import {
  IsNotEmpty,
  IsString,
  IsIn,
  IsBoolean,
  IsArray,
  IsDate,
  MinDate,
  MaxDate,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

export class CreateClientDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser un texto' })
  readonly firstName: string;

  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  @IsString({ message: 'El apellido debe ser un texto' })
  readonly lastName: string;

  @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria' })
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'La fecha de nacimiento debe ser una fecha válida' })
  @MinDate(new Date('1900-01-01'), {
    message: 'La fecha de nacimiento es muy antigua',
  })
  @MaxDate(new Date('2010-01-01'), {
    message: 'La fecha de nacimiento no puede ser mayor a la fecha actual',
  })
  readonly dateOfBirth: Date;

  @IsNotEmpty({ message: 'El lugar de nacimiento es obligatorio' })
  @IsString({ message: 'El lugar de nacimiento debe ser un texto' })
  readonly placeOfBirth: string;

  @IsNotEmpty({ message: 'El género es obligatorio' })
  @IsIn(['Masculino', 'Femenino', 'Otro'], {
    message: 'El género no es válido',
  })
  readonly gender: 'Masculino' | 'Femenino' | 'Otro';

  @IsNotEmpty({ message: 'La dirección es obligatoria' })
  @IsString({ message: 'La dirección debe ser un texto' })
  readonly address: string;

  @IsNotEmpty({ message: 'El suscrito a noticias es obligatorio' })
  @IsBoolean({ message: 'El suscrito a noticias debe ser un booleano' })
  readonly newsSubscriber: boolean;

  @IsNotEmpty({ message: 'Las preferencias son obligatorias' })
  @IsArray({ message: 'Las preferencias deben ser un array' })
  readonly preferences: Array<string>;
}

export class UpdateClientDto extends PartialType(CreateClientDto) {}
