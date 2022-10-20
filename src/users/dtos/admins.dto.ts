import {
  IsDate,
  IsNotEmpty,
  IsString,
  IsEnum,
  MinDate,
  MaxDate,
} from 'class-validator';

export class CreateAdminDto {
  @IsString({ message: 'El nombre no es válido' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  readonly firstName: string;
  @IsString({ message: 'El apellido no es válido' })
  @IsNotEmpty({ message: 'El apellido no puede estar vacío' })
  readonly lastName: string;
  @IsDate({ message: 'La fecha de nacimiento debe ser una fecha válida' })
  @IsNotEmpty({ message: 'La fecha de nacimiento no puede estar vacía' })
  @MinDate(new Date('1930-01-01'), {
    message: 'La fecha de nacimiento no es válida',
  })
  @MaxDate(new Date('2009-01-01'), {
    message: 'La fecha de nacimiento no es válida',
  })
  readonly dateOfBirth: Date;
  @IsString({ message: 'El lugar de nacimiento no es válido' })
  readonly placeOfBirth: string;
  @IsEnum(['Masculino', 'Femenino', 'Otro'], {
    message: 'El género no es válido',
  })
  readonly gender: 'Masculino' | 'Femenino' | 'Otro';
}
