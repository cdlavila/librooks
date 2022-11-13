import {
  IsString,
  IsNumberString,
  IsDate,
  IsNotEmpty,
  IsByteLength,
  IsUUID,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { Client } from '../../users/entities/client.entity';

export class CreatePaymentCardDto {
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  readonly name: string;

  @IsByteLength(16, 16, {
    message: 'El número debe tener 16 caracteres',
  })
  @IsNumberString({ message: 'El número debe ser un numérico' })
  @IsNotEmpty({ message: 'El número es requerido' })
  readonly number: string;

  @IsDate({ message: 'La fecha de expiración debe ser una fecha' })
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty({ message: 'La fecha de expiración es requerida' })
  readonly expirationDate: Date;

  @IsByteLength(3, 3, {
    message: 'El código de seguridad debe tener 3 caracteres',
  })
  @IsNumberString({ message: 'El código de seguridad debe ser numérico' })
  @IsNotEmpty({ message: 'El código de seguridad es requerido' })
  readonly cvc: string;

  @IsUUID('4', { message: 'El id del cliente debe ser un UUID' })
  @IsNotEmpty({ message: 'El id del cliente es obligatorio' })
  readonly client: Client;
}

export class UpdatePaymentCardDto extends PartialType(CreatePaymentCardDto) {}
