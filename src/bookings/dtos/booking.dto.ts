import { PartialType } from '@nestjs/mapped-types';
import { Client } from '../../users/entities/client.entity';
import { Store } from '../../books/entities/store.entity';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateBookingDto {
  @IsString({ message: 'Los detalles deben ser un texto' })
  @IsNotEmpty({ message: 'Los detalles son requeridos' })
  readonly details: string;

  @IsString({ message: 'El estado debe ser un texto' })
  @IsNotEmpty({ message: 'El estado es requerido' })
  readonly status: string;

  @IsDate({ message: 'Debe ser una fecha' })
  @IsNotEmpty({ message: 'La fecha es requerida' })
  readonly date: Date;

  @IsPositive({ message: 'El total debe ser un número positivo' })
  @IsNumber({}, { message: 'El total debe ser un número' })
  @IsNotEmpty({ message: 'El total es requerido' })
  readonly total: number;

  @IsNotEmpty({ message: 'El cliente es requerido' })
  readonly client: Client;

  @IsNotEmpty({ message: 'La tienda es requerida' })
  readonly store: Store;
}

export class UpdateBookingDto extends PartialType(CreateBookingDto) {}
