export class CreateClientDto {
  readonly firstName: string;
  readonly lastName: string;
  readonly placeOfBirth: string;
  readonly dateOfBirth: Date;
  readonly gender: 'Masculino' | 'Femenino' | 'Otro';
  readonly address: string;
  readonly newsSubscriber: boolean;
  readonly preferences: Array<string>;
}
