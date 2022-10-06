import { MigrationInterface, QueryRunner } from 'typeorm';

export class createAllUsers1665089222981 implements MigrationInterface {
  name = 'createAllUsers1665089222981';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('root', 'admin', 'client') NOT NULL DEFAULT 'client', \`is_active\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`admins\` (\`id\` varchar(36) NOT NULL, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`place_of_birth\` varchar(255) NOT NULL, \`gender\` enum ('femenino', 'masculino', 'otro') NOT NULL, \`email\` varchar(255) NOT NULL, \`date_of_birth\` date NOT NULL, \`user_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_051db7d37d478a69a7432df147\` (\`email\`), UNIQUE INDEX \`REL_2b901dd818a2a6486994d915a6\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`clients\` (\`id\` varchar(36) NOT NULL, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`place_of_birth\` varchar(255) NOT NULL, \`date_of_birth\` date NOT NULL, \`gender\` enum ('Femenino', 'Masculino', 'Otro') NOT NULL, \`address\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`news_subscriber\` tinyint NOT NULL DEFAULT 0, \`preferences\` json NOT NULL, \`user_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_b48860677afe62cd96e1265948\` (\`email\`), UNIQUE INDEX \`REL_07a7a09b04e7b035c9d90cf498\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`admins\` ADD CONSTRAINT \`FK_2b901dd818a2a6486994d915a68\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`clients\` ADD CONSTRAINT \`FK_07a7a09b04e7b035c9d90cf4984\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`clients\` DROP FOREIGN KEY \`FK_07a7a09b04e7b035c9d90cf4984\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`admins\` DROP FOREIGN KEY \`FK_2b901dd818a2a6486994d915a68\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_07a7a09b04e7b035c9d90cf498\` ON \`clients\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_b48860677afe62cd96e1265948\` ON \`clients\``,
    );
    await queryRunner.query(`DROP TABLE \`clients\``);
    await queryRunner.query(
      `DROP INDEX \`REL_2b901dd818a2a6486994d915a6\` ON \`admins\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_051db7d37d478a69a7432df147\` ON \`admins\``,
    );
    await queryRunner.query(`DROP TABLE \`admins\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
