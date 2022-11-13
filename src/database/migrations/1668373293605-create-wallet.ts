import { MigrationInterface, QueryRunner } from 'typeorm';

export class createWallet1668373293605 implements MigrationInterface {
  name = 'createWallet1668373293605';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`wallets\` (\`id\` varchar(36) NOT NULL, \`balance\` float NOT NULL, \`client\` varchar(36) NULL, UNIQUE INDEX \`REL_d08307c7f4ca4e754b254d151c\` (\`client\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`wallets\` ADD CONSTRAINT \`FK_d08307c7f4ca4e754b254d151c3\` FOREIGN KEY (\`client\`) REFERENCES \`clients\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`wallets\` DROP FOREIGN KEY \`FK_d08307c7f4ca4e754b254d151c3\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_d08307c7f4ca4e754b254d151c\` ON \`wallets\``,
    );
    await queryRunner.query(`DROP TABLE \`wallets\``);
  }
}
