import {
  IsBoolean,
  IsString,
  IsNotEmpty,
  IsEnum,
  IsEmail,
  IsByteLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'El nombre de usuario no es válido' })
  @IsNotEmpty({ message: 'El nombre de usuario no puede estar vacío' })
  readonly username: string;
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @IsEmail({}, { message: 'El correo no es válido' })
  readonly email: string;
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  @IsByteLength(8, 16, {
    message: 'La contraseña debe tener entre 8 y 16 caracteres',
  })
  readonly password: string;
  @IsEnum(['Masculino', 'Femenino', 'Otro'], {
    message: 'El género no es válido',
  })
  @IsNotEmpty({ message: 'El role no puede estar vacío' })
  readonly role: 'root' | 'admin' | 'client';
  @IsBoolean({ message: 'El estado no es válido' })
  @IsNotEmpty({ message: 'El estado no puede estar vacío' })
  readonly isActive: boolean;
}
