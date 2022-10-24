import {
  IsNotEmpty,
  IsString,
  IsIn,
  // IsDate,
  // MinDate,
  // MaxDate,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateAdminDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser un texto' })
  readonly firstName: string;

  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  @IsString({ message: 'El apellido debe ser un texto' })
  readonly lastName: string;

  @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria' })
  // @IsDate({ message: 'La fecha de nacimiento debe ser una fecha válida' })
  // @MinDate(new Date('1900-01-01'), {
  //   message: 'La fecha de nacimiento es muy antigua',
  // })
  // @MaxDate(new Date(), {
  //   message: 'La fecha de nacimiento no puede ser mayor a la fecha actual',
  // })
  readonly dateOfBirth: Date;

  @IsNotEmpty({ message: 'El lugar de nacimiento es obligatorio' })
  @IsString({ message: 'El lugar de nacimiento debe ser un texto' })
  readonly placeOfBirth: string;

  @IsNotEmpty({ message: 'El género es obligatorio' })
  @IsIn(['Masculino', 'Femenino', 'Otro'], {
    message: 'El género no es válido',
  })
  readonly gender: 'Masculino' | 'Femenino' | 'Otro';
}

export class UpdateAdminDto extends PartialType(CreateAdminDto) {}
