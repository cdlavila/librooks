import {
  IsDate,
  IsNotEmpty,
  IsString,
  IsEnum,
  IsBoolean,
  IsArray,
  MinDate,
  MaxDate,
} from 'class-validator';
export class CreateClientDto {
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @IsString({ message: 'El nombre no es válido' })
  readonly firstName: string;
  @IsNotEmpty({ message: 'El apellido no puede estar vacío' })
  @IsString({ message: 'El apellido no es válido' })
  readonly lastName: string;
  @IsString({ message: 'El lugar de nacimiento no es válido' })
  readonly placeOfBirth: string;
  @IsDate({ message: 'La fecha de nacimiento debe ser una fecha válida' })
  @IsNotEmpty({ message: 'La fecha de nacimiento no puede estar vacía' })
  @MinDate(new Date('1930-01-01'), {
    message: 'La fecha de nacimiento no es válida',
  })
  @MaxDate(new Date('2009-01-01'), {
    message: 'La fecha de nacimiento no es válida',
  })
  readonly dateOfBirth: Date;
  @IsEnum(['Masculino', 'Femenino', 'Otro'], {
    message: 'El género no es válido',
  })
  readonly gender: 'Masculino' | 'Femenino' | 'Otro';
  @IsString({ message: 'La dirección no es valida' })
  readonly address: string;
  @IsBoolean({ message: 'El estado no es válido' })
  readonly newsSubscriber: boolean;
  @IsArray({ message: 'las preferencias no son válidas' })
  readonly preferences: Array<string>;
}
