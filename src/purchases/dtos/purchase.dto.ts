import { Client } from '../../users/entities/client.entity';
import { Store } from '../../books/entities/store.entity';
import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePurchaseDto {
  @IsString({ message: 'El campo "detalles" debe ser de tipo texto' })
  @IsNotEmpty({ message: 'El campo "detalles" no puede estar vacío' })
  readonly details: string;

  @IsString({ message: 'El campo "estado" debe ser de tipo texto' })
  @IsNotEmpty({ message: 'El campo "estado" no puede estar vacío' })
  readonly status: string;

  @IsDate({ message: 'El campo "fecha" debe ser de tipo fecha' })
  @IsNotEmpty({ message: 'El campo "fecha" no puede estar vacío' })
  readonly date: Date;

  @IsNumber({}, { message: 'El campo "total" debe ser de tipo numérico' })
  @IsNotEmpty({ message: 'El campo "total" no puede estar vacío' })
  readonly total: number;

  @IsIn(['Recogida en tienda', 'Envío a domicilio'], {
    message:
      'El campo "método de entrega" debe ser "Recogida en tienda" o "Envío a domicilio"',
  })
  @IsNotEmpty({ message: 'El campo "método de entrega" no puede estar vacío' })
  readonly deliveryMethod: 'Recogida en tienda' | 'Envío a domicilio';

  readonly client: Client;

  readonly store: Store;
}

export class UpdatePurchaseDto extends PartialType(CreatePurchaseDto) {}
