import { PartialType } from '@nestjs/mapped-types';
import { Client } from '../../users/entities/client.entity';
import { Store } from '../../books/entities/store.entity';

export class CreateBookingDto {
  readonly details: string;

  readonly status: string;

  readonly date: Date;

  readonly total: number;

  readonly client: Client;

  readonly store: Store;
}

export class UpdateBookingDto extends PartialType(CreateBookingDto) {}
