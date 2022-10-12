import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'admins' })
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: false,
    name: 'first_name',
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: false,
    name: 'last_name',
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: false,
    name: 'place_of_birth',
  })
  placeOfBirth: string;

  @Column({
    type: 'enum',
    enum: ['Femenino', 'Masculino', 'Otro'],
    nullable: false,
    unique: false,
    name: 'gender',
  })
  gender: 'Femenino' | 'Masculino' | 'Otro';

  @Column({
    type: 'date',
    nullable: false,
    unique: false,
    name: 'date_of_birth',
  })
  dateOfBirth: Date;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
