import { IsByteLength, IsEmail, IsJWT, IsNotEmpty } from 'class-validator';

export class RequestPasswordResetDto {
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  @IsEmail({}, { message: 'El correo electrónico no tiene un formato válido' })
  email: string;
}

export class ValidatePasswordResetTokenDto {
  @IsNotEmpty({ message: 'El token es obligatorio' })
  @IsJWT({ message: 'El token no tiene un formato válido' })
  token: string;
}

export class ResetPasswordDto {
  @IsNotEmpty({ message: 'El token es obligatorio' })
  @IsJWT({ message: 'El token no tiene un formato válido' })
  token: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @IsByteLength(8, 32, {
    message: 'La contraseña debe tener entre 8 y 32 caracteres',
  })
  password: string;
}
