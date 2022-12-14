import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Admin } from './admin.entity';
import { Client } from './client.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
    name: 'username',
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
    name: 'email',
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'password',
  })
  password: string;

  @Column({
    type: 'enum',
    enum: ['root', 'admin', 'client'],
    nullable: false,
    default: 'client',
    name: 'role',
  })
  role: 'root' | 'admin' | 'client';

  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
    name: 'is_active',
  })
  isActive: boolean;

  @OneToOne(() => Admin, (admin) => admin.user, {
    nullable: true,
  })
  admin: Admin;

  @OneToOne(() => Client, (client) => client.user, {
    nullable: true,
  })
  client: Client;
}
