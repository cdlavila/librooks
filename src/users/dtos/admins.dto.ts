import { IsNotEmpty, IsString, IsIn, IsDate, MaxDate } from 'class-validator';
import { Transform } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

export class CreateAdminDto {
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  readonly firstName: string;

  @IsString({ message: 'El apellido debe ser un texto' })
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  readonly lastName: string;

  @MaxDate(new Date(), {
    message: 'La fecha de nacimiento no puede ser mayor a la fecha actual',
  })
  @IsDate({ message: 'La fecha de nacimiento debe ser una fecha válida' })
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria' })
  readonly dateOfBirth: Date;

  @IsString({ message: 'El lugar de nacimiento debe ser un texto' })
  @IsNotEmpty({ message: 'El lugar de nacimiento es obligatorio' })
  readonly placeOfBirth: string;

  @IsIn(['Masculino', 'Femenino', 'Otro'], {
    message: 'El género no es válido',
  })
  @IsNotEmpty({ message: 'El género es obligatorio' })
  readonly gender: 'Masculino' | 'Femenino' | 'Otro';
}

export class UpdateAdminDto extends PartialType(CreateAdminDto) {}
