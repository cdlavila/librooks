import { MigrationInterface, QueryRunner } from 'typeorm';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';

dotenv.config({ path: '.env' });

export class seedRoot1668061490722 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert('users', {
      id: '8d4169b9-673b-4819-8097-376548c51a15',
      username: 'root',
      email: 'root@librooks.com',
      password: bcrypt.hashSync(process.env.ROOT_PASSWORD, 10),
      role: 'root',
      is_active: 1,
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete('users', {
      id: '8d4169b9-673b-4819-8097-376548c51a15',
    });
  }
}
