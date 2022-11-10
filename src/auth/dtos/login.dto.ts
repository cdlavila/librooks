import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({
    message: 'El nombre de usuario o correo electrónico es obligatorio',
  })
  readonly username: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  readonly password: string;
}
