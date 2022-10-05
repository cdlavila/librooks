import { MigrationInterface, QueryRunner } from "typeorm";

export class createAdmin1664991379739 implements MigrationInterface {
    name = 'createAdmin1664991379739'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`admins\` (\`id\` varchar(36) NOT NULL, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`place_of_birth\` varchar(255) NOT NULL, \`gender\` enum ('femenino', 'masculino', 'otro') NOT NULL, \`email\` varchar(255) NOT NULL, \`date_of_birth\` date NOT NULL, \`user_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_051db7d37d478a69a7432df147\` (\`email\`), UNIQUE INDEX \`REL_2b901dd818a2a6486994d915a6\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`admins\` ADD CONSTRAINT \`FK_2b901dd818a2a6486994d915a68\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`admins\` DROP FOREIGN KEY \`FK_2b901dd818a2a6486994d915a68\``);
        await queryRunner.query(`DROP INDEX \`REL_2b901dd818a2a6486994d915a6\` ON \`admins\``);
        await queryRunner.query(`DROP INDEX \`IDX_051db7d37d478a69a7432df147\` ON \`admins\``);
        await queryRunner.query(`DROP TABLE \`admins\``);
    }

}
