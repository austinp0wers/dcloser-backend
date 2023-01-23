import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUserTable1672015625888 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TYPE \"users_role_enum\" AS ENUM('USER', 'ADMIN')",
    );
    await queryRunner.query(`
      CREATE TABLE "users"
      (
        "id"         serial              NOT NULL,
        "name" character varying,
        "email"      character varying,
        "phone"      character varying,
        "password"   character varying,
        "role"       "users_role_enum" NOT NULL DEFAULT 'USER',
        "created_at" TIMESTAMP         NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP         NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP         DEFAULT NULL,
        CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
      )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "users"');
    await queryRunner.query('DROP TYPE "users_role_enum"');
  }
}
