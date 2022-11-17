import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterPaymentCardChangeExpirationDate1668665462531
  implements MigrationInterface
{
  name = 'alterPaymentCardChangeExpirationDate1668665462531';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`payment_cards\` DROP COLUMN \`expiration_date\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment_cards\` ADD \`expiration_date\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`payment_cards\` DROP COLUMN \`expiration_date\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment_cards\` ADD \`expiration_date\` date NOT NULL`,
    );
  }
}
