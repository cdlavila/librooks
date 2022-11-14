import { MigrationInterface, QueryRunner } from 'typeorm';

export class createBookings1668443514131 implements MigrationInterface {
  name = 'createBookings1668443514131';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`bookings\` (\`id\` varchar(36) NOT NULL, \`details\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`date\` date NOT NULL, \`total\` float NOT NULL, \`client_id\` varchar(36) NULL, \`store_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`bookings_books\` (\`id\` varchar(36) NOT NULL, \`quantity\` int NOT NULL, \`book_id\` varchar(36) NULL, \`booking_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bookings\` ADD CONSTRAINT \`FK_23096dca2f7a9d1505d0267d4c6\` FOREIGN KEY (\`client_id\`) REFERENCES \`clients\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bookings\` ADD CONSTRAINT \`FK_cebf89b278facba16b3273ca01f\` FOREIGN KEY (\`store_id\`) REFERENCES \`stores\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bookings_books\` ADD CONSTRAINT \`FK_33bf801d1d1205cd79ffb6da2a0\` FOREIGN KEY (\`book_id\`) REFERENCES \`books\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bookings_books\` ADD CONSTRAINT \`FK_7637f38af7c40567713dfd8fa94\` FOREIGN KEY (\`booking_id\`) REFERENCES \`bookings\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`bookings_books\` DROP FOREIGN KEY \`FK_7637f38af7c40567713dfd8fa94\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bookings_books\` DROP FOREIGN KEY \`FK_33bf801d1d1205cd79ffb6da2a0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bookings\` DROP FOREIGN KEY \`FK_cebf89b278facba16b3273ca01f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bookings\` DROP FOREIGN KEY \`FK_23096dca2f7a9d1505d0267d4c6\``,
    );
    await queryRunner.query(`DROP TABLE \`bookings_books\``);
    await queryRunner.query(`DROP TABLE \`bookings\``);
  }
}
