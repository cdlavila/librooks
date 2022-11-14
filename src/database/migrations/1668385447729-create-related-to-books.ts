import { MigrationInterface, QueryRunner } from 'typeorm';

export class createRelatedToBooks1668385447729 implements MigrationInterface {
  name = 'createRelatedToBooks1668385447729';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`stores\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`coordinates\` json NOT NULL, \`photo\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_a205ca5a37fa5e10005f003aaf\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`stocks\` (\`id\` varchar(36) NOT NULL, \`quantity\` int NOT NULL, \`book_id\` varchar(36) NULL, \`store_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`news\` (\`id\` varchar(36) NOT NULL, \`date\` date NOT NULL, \`description\` varchar(255) NOT NULL, \`book_id\` varchar(36) NULL, UNIQUE INDEX \`REL_b3ee1fbbe51c16ab4f3d079ca1\` (\`book_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`books\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`author\` varchar(255) NOT NULL, \`status\` enum ('Nuevo', 'Usado') NOT NULL DEFAULT 'Nuevo', \`publication_date\` date NOT NULL, \`issn\` varchar(255) NOT NULL, \`genre\` varchar(255) NOT NULL, \`pages_number\` int NOT NULL, \`language\` varchar(255) NOT NULL, \`editorial\` varchar(255) NOT NULL, \`photo\` varchar(255) NOT NULL, \`is_exhausted\` tinyint NOT NULL, \`price\` float NOT NULL, UNIQUE INDEX \`IDX_3cd818eaf734a9d8814843f119\` (\`title\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`stocks\` ADD CONSTRAINT \`FK_1a5034b787301c2493eed57fe0f\` FOREIGN KEY (\`book_id\`) REFERENCES \`books\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`stocks\` ADD CONSTRAINT \`FK_6fdcbba5cc8a62ae295a45a6356\` FOREIGN KEY (\`store_id\`) REFERENCES \`stores\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`news\` ADD CONSTRAINT \`FK_b3ee1fbbe51c16ab4f3d079ca1d\` FOREIGN KEY (\`book_id\`) REFERENCES \`books\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`news\` DROP FOREIGN KEY \`FK_b3ee1fbbe51c16ab4f3d079ca1d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`stocks\` DROP FOREIGN KEY \`FK_6fdcbba5cc8a62ae295a45a6356\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`stocks\` DROP FOREIGN KEY \`FK_1a5034b787301c2493eed57fe0f\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_3cd818eaf734a9d8814843f119\` ON \`books\``,
    );
    await queryRunner.query(`DROP TABLE \`books\``);
    await queryRunner.query(
      `DROP INDEX \`REL_b3ee1fbbe51c16ab4f3d079ca1\` ON \`news\``,
    );
    await queryRunner.query(`DROP TABLE \`news\``);
    await queryRunner.query(`DROP TABLE \`stocks\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_a205ca5a37fa5e10005f003aaf\` ON \`stores\``,
    );
    await queryRunner.query(`DROP TABLE \`stores\``);
  }
}
