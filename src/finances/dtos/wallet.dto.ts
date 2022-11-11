import { IsNotEmpty, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateWalletDto {
  @IsNumber({}, { message: 'El saldo debe ser un número' })
  @IsNotEmpty({ message: 'El saldo del cliente es obligatorio' })
  readonly balance: number;
}
export class UpdateWalletDto extends PartialType(CreateWalletDto) {}
