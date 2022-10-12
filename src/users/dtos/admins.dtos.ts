export class CreateAdminDto {
  readonly first_name: string;
  readonly last_name: string;
  readonly date_of_birth: Date;
  readonly place_of_birth: string;
  readonly gender: 'Masculino' | 'Femenino' | 'Otro';
  readonly user_id: string;
}
