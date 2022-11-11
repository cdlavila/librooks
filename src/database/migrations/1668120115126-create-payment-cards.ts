import { MigrationInterface, QueryRunner } from 'typeorm';

export class createPaymentCards1668120493841 implements MigrationInterface {
  name = 'createPaymentCards1668120493841';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`payment_cards\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`number\` varchar(255) NOT NULL, \`expiration_date\` date NOT NULL, \`cvc\` varchar(4) NOT NULL, \`client_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_8653ae402779431903b108b5b7\` (\`number\`), UNIQUE INDEX \`REL_26171ba4f0bf4908fd6465f147\` (\`client_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment_cards\` ADD CONSTRAINT \`FK_26171ba4f0bf4908fd6465f147f\` FOREIGN KEY (\`client_id\`) REFERENCES \`clients\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`payment_cards\` DROP FOREIGN KEY \`FK_26171ba4f0bf4908fd6465f147f\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_26171ba4f0bf4908fd6465f147\` ON \`payment_cards\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_8653ae402779431903b108b5b7\` ON \`payment_cards\``,
    );
    await queryRunner.query(`DROP TABLE \`payment_cards\``);
  }
}
