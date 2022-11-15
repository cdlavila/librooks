import { PartialType } from '@nestjs/mapped-types';
import { Purchase } from '../entities/purchase.entity';

export class ReturnDto {
  readonly reason:
    | 'Producto en mal estado'
    | 'Producto no llenó las expectativas'
    | 'Producto entregado en un tiempo superior al estipulado';

  readonly details: string;

  readonly status: 'En revisión' | 'Aprobado' | 'Rechazado';

  readonly purchase: Purchase;
}

export class UpdateReturnDto extends PartialType(ReturnDto) {}
