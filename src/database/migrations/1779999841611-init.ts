import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1779999841611 implements MigrationInterface {
  name = 'Init1779999841611';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('USER', 'ADMIN')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'USER', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."loan_status_enum" AS ENUM('PENDING', 'APPROVED', 'REJECTED', 'OVERDUE', 'PAID')`,
    );
    await queryRunner.query(
      `CREATE TABLE "loan" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" numeric NOT NULL, "durationMonths" integer NOT NULL, "purpose" character varying NOT NULL, "status" "public"."loan_status_enum" NOT NULL DEFAULT 'PENDING', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "dueDate" TIMESTAMP NOT NULL, "userId" uuid, CONSTRAINT "PK_4ceda725a323d254a5fd48bf95f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" ADD CONSTRAINT "FK_ef7a63b4c4f0edd90e389edb103" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "loan" DROP CONSTRAINT "FK_ef7a63b4c4f0edd90e389edb103"`,
    );
    await queryRunner.query(`DROP TABLE "loan"`);
    await queryRunner.query(`DROP TYPE "public"."loan_status_enum"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
  }
}
