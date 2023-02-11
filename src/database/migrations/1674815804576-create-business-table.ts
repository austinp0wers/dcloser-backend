import { MigrationInterface, QueryRunner } from 'typeorm';

export class createBusinessTable1674815804576 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "businesses" (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NULL,
                created_at TIMESTAMP NOT NULL DEFAULT now(),
                updated_at TIMESTAMP NOT NULL DEFAULT now(),
                deleted_at TIMESTAMP NULL
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE business`);
  }
}
