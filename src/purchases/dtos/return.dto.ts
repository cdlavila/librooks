import { PartialType } from '@nestjs/mapped-types';
import { Purchase } from '../entities/purchase.entity';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class ReturnDto {
  @IsIn(
    [
      'Producto en mal estado',
      'Producto no llenó las expectativas',
      'Producto entregado en un tiempo superior al estipulado',
    ],
    { message: 'La razón no es válida' },
  )
  @IsNotEmpty({ message: 'El campo "reason" no puede estar vacío' })
  readonly reason:
    | 'Producto en mal estado'
    | 'Producto no llenó las expectativas'
    | 'Producto entregado en un tiempo superior al estipulado';

  @IsString({ message: 'El campo "details" debe ser un texto' })
  @IsNotEmpty({ message: 'El campo "details" no puede estar vacío' })
  readonly details: string;

  @IsIn(['En revisión', 'Aprobado', 'Rechazado'], {
    message: 'El estado no es válido',
  })
  @IsNotEmpty({ message: 'El campo "purchase" no puede estar vacío' })
  readonly status: 'En revisión' | 'Aprobado' | 'Rechazado';

  readonly purchase: Purchase;
}

export class UpdateReturnDto extends PartialType(ReturnDto) {}
