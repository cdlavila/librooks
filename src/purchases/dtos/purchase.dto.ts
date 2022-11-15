import { Client } from '../../users/entities/client.entity';
import { Store } from '../../books/entities/store.entity';
import { PartialType } from '@nestjs/mapped-types';

export class CreatePurchaseDto {
  readonly details: string;

  readonly status: string;

  readonly date: Date;

  readonly total: number;

  readonly deliveryMethod: 'Recogida en tienda' | 'Envío a domicilio';

  readonly client: Client;

  readonly store: Store;
}

export class UpdatePurchaseDto extends PartialType(CreatePurchaseDto) {}
