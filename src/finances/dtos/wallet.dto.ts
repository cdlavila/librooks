import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Client } from '../../users/entities/client.entity';

export class CreateWalletDto {
  @IsNumber({}, { message: 'El saldo debe ser un número' })
  @IsNotEmpty({ message: 'El saldo del cliente es obligatorio' })
  readonly balance: number;

  @IsUUID('4', { message: 'El id del cliente debe ser un UUID' })
  @IsNotEmpty({ message: 'El id del cliente es obligatorio' })
  readonly client: Client;
}
export class UpdateWalletDto extends PartialType(CreateWalletDto) {}
