export class CreateAdminDto {
  readonly firstName: string;
  readonly lastName: string;
  readonly dateOfBirth: Date;
  readonly placeOfBirth: string;
  readonly gender: 'Masculino' | 'Femenino' | 'Otro';
}
