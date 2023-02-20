import { MigrationInterface, QueryRunner } from 'typeorm';

export class productAddDescription1676891394771 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE products
            ADD COLUMN description VARCHAR;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
