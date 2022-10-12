export class CreateAdminDto {
  readonly frit_name: string;
  readonly last_name: string;
  readonly date_of_birth: Date;
  readonly place_of_birth: string;
  readonly gender: 'masculino' | 'femenino' | 'otro';
  readonly email: string;
  readonly user_id: string;
}
