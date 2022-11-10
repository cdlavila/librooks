import { IsByteLength, IsEmail, IsJWT, IsNotEmpty } from 'class-validator';

export class RequestPasswordResetDto {
  @IsEmail({}, { message: 'El correo electrónico no tiene un formato válido' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  email: string;
}

export class ValidatePasswordResetTokenDto {
  @IsJWT({ message: 'El token no tiene un formato válido' })
  @IsNotEmpty({ message: 'El token es obligatorio' })
  token: string;
}

export class ResetPasswordDto {
  @IsJWT({ message: 'El token no tiene un formato válido' })
  @IsNotEmpty({ message: 'El token es obligatorio' })
  token: string;

  @IsByteLength(8, 32, {
    message: 'La contraseña debe tener entre 8 y 32 caracteres',
  })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  password: string;
}
