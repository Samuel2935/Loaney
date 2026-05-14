import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1778782252360 implements MigrationInterface {
  name = 'Init1778782252360';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "loans" ADD "dueDate" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "loans" DROP COLUMN "dueDate"`);
  }
}
