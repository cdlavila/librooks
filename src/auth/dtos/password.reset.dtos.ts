import { IsEmail, IsNotEmpty } from 'class-validator';

export class PasswordResetDto {
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  @IsEmail({}, { message: 'El correo electrónico no tiene un formato válido' })
  email: string;
}
