import {
  IsString,
  IsNumberString,
  IsDate,
  IsNotEmpty,
  IsByteLength,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreatePaymentCardDto {
  @IsString({ message: 'La tarjeta debe tener un nombre de tipo cadena' })
  @IsNotEmpty({ message: 'El nombre de la tarjeta es requerido' })
  readonly name: string;

  @IsByteLength(16, 16, {
    message: 'El número de la tarjeta debe tener 16 caracteres',
  })
  @IsNumberString({ message: 'El número de la tarjeta debe ser un número' })
  @IsString({ message: 'El número de la tarjeta debe ser valido' })
  @IsNotEmpty({ message: 'El número de la tarjeta es requerido' })
  readonly number: string;

  @IsDate({ message: 'La fecha de expiración debe ser una fecha' })
  @IsNotEmpty({ message: 'La fecha de expiración es requerida' })
  readonly expirationDate: Date;

  @IsByteLength(3, 3, {
    message: 'El código de seguridad debe tener 3 caracteres',
  })
  @IsNumberString({ message: 'El código de seguridad debe ser un número' })
  @IsString({ message: 'El código de seguridad debe ser valido' })
  @IsNotEmpty({ message: 'El código de seguridad es requerido' })
  readonly cvc: string;
}

export class UpdatePaymentCardDto extends PartialType(CreatePaymentCardDto) {}
