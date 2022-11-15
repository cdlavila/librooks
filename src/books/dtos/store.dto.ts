import { IsNotEmpty, IsString, IsUrl, IsObject } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateStoreDto {
  @IsString({ message: 'El campo nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El campo nombre es obligatorio' })
  readonly name: string;

  @IsString({ message: 'El campo dirección debe ser un texto' })
  @IsNotEmpty({ message: 'El campo dirección es obligatorio' })
  readonly address: string;

  @IsObject({ message: 'El campo coordenadas debe ser un objeto' })
  @IsNotEmpty({ message: 'El campo coordenadas es obligatorio' })
  readonly coordinates: { latitude: number; longitude: number };

  @IsUrl({}, { message: 'El campo foto debe ser una url válida' })
  @IsNotEmpty({ message: 'El campo foto es obligatorio' })
  readonly photo: string;
}

export class UpdateStoreDto extends PartialType(CreateStoreDto) {}
