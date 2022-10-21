import {
  IsBoolean,
  IsString,
  IsNotEmpty,
  IsIn,
  IsEmail,
  IsByteLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
  @IsString({ message: 'El nombre de usuario debe ser un texto' })
  readonly username: string;

  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  @IsEmail({}, { message: 'El correo electrónico no tiene un formato válido' })
  readonly email: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @IsByteLength(8, 16, {
    message: 'La contraseña debe tener entre 8 y 16 caracteres',
  })
  readonly password: string;

  @IsNotEmpty({ message: 'El rol es obligatorio' })
  @IsIn(['Masculino', 'Femenino', 'Otro'], {
    message: 'El rol no es válido',
  })
  readonly role: 'root' | 'admin' | 'client';

  @IsNotEmpty({ message: 'El esta activo es obligatorio' })
  @IsBoolean({ message: 'El esta activo debe ser un booleano' })
  readonly isActive: boolean;
}
