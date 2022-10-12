import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterUsersEmail1665165027194 implements MigrationInterface {
  name = 'alterUsersEmail1665165027194';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_051db7d37d478a69a7432df147\` ON \`admins\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_b48860677afe62cd96e1265948\` ON \`clients\``,
    );
    await queryRunner.query(`ALTER TABLE \`admins\` DROP COLUMN \`email\``);
    await queryRunner.query(`ALTER TABLE \`clients\` DROP COLUMN \`email\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`email\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\``,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`email\``);
    await queryRunner.query(
      `ALTER TABLE \`clients\` ADD \`email\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`admins\` ADD \`email\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_b48860677afe62cd96e1265948\` ON \`clients\` (\`email\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_051db7d37d478a69a7432df147\` ON \`admins\` (\`email\`)`,
    );
  }
}
