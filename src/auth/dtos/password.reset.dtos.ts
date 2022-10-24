import { IsEmail, IsJWT, IsNotEmpty } from 'class-validator';

export class PasswordResetDto {
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  @IsEmail({}, { message: 'El correo electrónico no tiene un formato válido' })
  email: string;
}

export class PasswordResetTokenDto {
  @IsNotEmpty({ message: 'El token es obligatorio' })
  @IsJWT({ message: 'El token no tiene un formato válido' })
  token: string;
}
