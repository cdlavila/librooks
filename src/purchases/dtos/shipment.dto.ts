import { Purchase } from '../entities/purchase.entity';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateShipmentDto {
  @IsString({
    message: 'El número de seguimiento debe ser una cadena de texto',
  })
  @IsNotEmpty({ message: 'El número de seguimiento es requerido' })
  readonly trackingNumber: string;

  @IsIn(['En preparación', 'Enviado', 'Entregado'], {
    message: 'El estado no es válido',
  })
  @IsNotEmpty({ message: 'El estado es requerido' })
  readonly status: 'En preparación' | 'Enviado' | 'Entregado';

  readonly purchase: Purchase;
}

export class UpdateShipmentDto extends CreateShipmentDto {}
