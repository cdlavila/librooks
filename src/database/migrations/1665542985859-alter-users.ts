import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterUsers1665542985859 implements MigrationInterface {
  name = 'alterUsers1665542985859';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`admins\` CHANGE \`gender\` \`gender\` enum ('Femenino', 'Masculino', 'Otro') NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`admins\` CHANGE \`gender\` \`gender\` enum ('femenino', 'masculino', 'otro') NOT NULL`,
    );
  }
}
