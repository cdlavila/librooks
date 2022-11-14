import { MigrationInterface, QueryRunner } from 'typeorm';

export class createRelatedToPurchases1668446229499
  implements MigrationInterface
{
  name = 'createRelatedToPurchases1668446229499';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`purchases_books\` (\`id\` varchar(36) NOT NULL, \`quantity\` int NOT NULL, \`book_id\` varchar(36) NULL, \`purchase_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`shipments\` (\`id\` varchar(36) NOT NULL, \`tracking_number\` varchar(255) NOT NULL, \`status\` enum ('En preparación', 'Enviado', 'Entregado') NOT NULL DEFAULT 'En preparación', \`purchase_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_e148d569550cfa0295ccf23706\` (\`tracking_number\`), UNIQUE INDEX \`REL_6c70f4eddf33d3d0dcf4f055dd\` (\`purchase_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`returns\` (\`id\` varchar(36) NOT NULL, \`reason\` enum ('Producto en mal estado', 'Producto no llenó las expectativas', 'Producto entregado en un tiempo superior al estipulado') NOT NULL, \`details\` text NOT NULL, \`status\` enum ('En revisión', 'Aprobado', 'Rechazado') NOT NULL DEFAULT 'En revisión', \`purchase_id\` varchar(36) NULL, UNIQUE INDEX \`REL_827b3c60c7e17859f343bcda26\` (\`purchase_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`purchases\` (\`id\` varchar(36) NOT NULL, \`details\` text NOT NULL, \`status\` varchar(255) NOT NULL, \`date\` date NOT NULL, \`total\` float NOT NULL, \`delivery_method\` enum ('Recogida en tienda', 'Envío a domicilio') NOT NULL DEFAULT 'Envío a domicilio', \`client_id\` varchar(36) NULL, \`store_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`bookings\` DROP COLUMN \`details\``);
    await queryRunner.query(
      `ALTER TABLE \`bookings\` ADD \`details\` text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`purchases_books\` ADD CONSTRAINT \`FK_169692c104b72bdcff420903312\` FOREIGN KEY (\`book_id\`) REFERENCES \`books\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`purchases_books\` ADD CONSTRAINT \`FK_e896d18c1a0abc92c70e11c56b3\` FOREIGN KEY (\`purchase_id\`) REFERENCES \`purchases\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`shipments\` ADD CONSTRAINT \`FK_6c70f4eddf33d3d0dcf4f055dd2\` FOREIGN KEY (\`purchase_id\`) REFERENCES \`purchases\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`returns\` ADD CONSTRAINT \`FK_827b3c60c7e17859f343bcda26b\` FOREIGN KEY (\`purchase_id\`) REFERENCES \`purchases\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`purchases\` ADD CONSTRAINT \`FK_8a4156ba6d7bc8d0ca55f4b2b93\` FOREIGN KEY (\`client_id\`) REFERENCES \`clients\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`purchases\` ADD CONSTRAINT \`FK_dec353eded97300e37299b03031\` FOREIGN KEY (\`store_id\`) REFERENCES \`stores\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`purchases\` DROP FOREIGN KEY \`FK_dec353eded97300e37299b03031\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`purchases\` DROP FOREIGN KEY \`FK_8a4156ba6d7bc8d0ca55f4b2b93\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`returns\` DROP FOREIGN KEY \`FK_827b3c60c7e17859f343bcda26b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`shipments\` DROP FOREIGN KEY \`FK_6c70f4eddf33d3d0dcf4f055dd2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`purchases_books\` DROP FOREIGN KEY \`FK_e896d18c1a0abc92c70e11c56b3\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`purchases_books\` DROP FOREIGN KEY \`FK_169692c104b72bdcff420903312\``,
    );
    await queryRunner.query(`ALTER TABLE \`bookings\` DROP COLUMN \`details\``);
    await queryRunner.query(
      `ALTER TABLE \`bookings\` ADD \`details\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE \`purchases\``);
    await queryRunner.query(
      `DROP INDEX \`REL_827b3c60c7e17859f343bcda26\` ON \`returns\``,
    );
    await queryRunner.query(`DROP TABLE \`returns\``);
    await queryRunner.query(
      `DROP INDEX \`REL_6c70f4eddf33d3d0dcf4f055dd\` ON \`shipments\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_e148d569550cfa0295ccf23706\` ON \`shipments\``,
    );
    await queryRunner.query(`DROP TABLE \`shipments\``);
    await queryRunner.query(`DROP TABLE \`purchases_books\``);
  }
}
