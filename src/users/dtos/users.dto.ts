import {
  IsBoolean,
  IsString,
  IsNotEmpty,
  IsIn,
  IsEmail,
  IsByteLength,
} from 'class-validator';
import { PartialType, OmitType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsString({ message: 'El nombre de usuario debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
  readonly username: string;

  @IsEmail({}, { message: 'El correo electrónico no tiene un formato válido' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  readonly email: string;

  @IsByteLength(8, 32, {
    message: 'La contraseña debe tener entre 8 y 32 caracteres',
  })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  readonly password: string;

  @IsIn(['root', 'admin', 'client'], {
    message: 'El rol no es válido',
  })
  @IsNotEmpty({ message: 'El rol es obligatorio' })
  readonly role: 'root' | 'admin' | 'client';

  @IsBoolean({ message: 'El esta activo debe ser un booleano' })
  @IsNotEmpty({ message: 'El esta activo es obligatorio' })
  readonly isActive: boolean;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class CreateUserWithoutPasswordDto extends OmitType(CreateUserDto, [
  'password',
] as const) {}
