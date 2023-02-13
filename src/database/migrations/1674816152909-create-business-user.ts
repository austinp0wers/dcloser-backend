import { MigrationInterface, QueryRunner } from 'typeorm';

export class createBusinessUser1674816152909 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TYPE \"users_role_enum\" AS ENUM('USER', 'MANAGER')",
    );
    await queryRunner.query(`
    CREATE TABLE "business_users" (
      id uuid NOT NULL DEFAULT gen_random_uuid(),
      name varchar(255) NOT NULL,
      email varchar(255) NOT NULL,
      business_id integer NOT NULL,
      phone varchar(255) NOT NULL,
      password varchar(255) NOT NULL,
      "role" "users_role_enum" NOT NULL DEFAULT 'USER',
      verified_status varchar(255) NOT NULL DEFAULT 'pending',
      "created_at" TIMESTAMP NOT NULL DEFAULT now(),
      "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
      "deleted_at" TIMESTAMP DEFAULT NULL,
      PRIMARY KEY (id),
      UNIQUE (email),
      UNIQUE (phone)
    );
    
    ALTER TABLE business_users
      ADD CONSTRAINT fk_business_users_business
      FOREIGN KEY (business_id)
      REFERENCES businesses (id)
      ON DELETE CASCADE;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "users"');
    await queryRunner.query('DROP TYPE "users_role_enum"');
  }
}
