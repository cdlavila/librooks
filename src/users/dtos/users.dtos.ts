export class CreateUserDto {
  readonly username: string;
  readonly password: string;
  readonly role: 'root' | 'admin' | 'client';
  readonly isActive: boolean;
}
