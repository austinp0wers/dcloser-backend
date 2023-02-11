import { MigrationInterface, QueryRunner } from 'typeorm';

export class createProposalTable1675759491814 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "proposals" (
        id SERIAL PRIMARY KEY,
        proposal_title VARCHAR(255) NOT NULL,
        customer_company_rep VARCHAR(255),
        business_id INT NOT NULL,
        business_user_id VARCHAR(255) NOT NULL,
        customer_company_id INT,
        paid_period VARCHAR(255),
        total_payment_price INT,
        status VARCHAR(255) DEFAULT 'DRAFT',
        expire_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW(),
        deleted_at TIMESTAMP
      );

      ALTER TABLE proposals
        ADD CONSTRAINT fk_proposals_business
        FOREIGN KEY (business_id)
        REFERENCES businesses (id)
        ON DELETE CASCADE;

      ALTER TABLE proposals
        ALTER COLUMN business_user_id TYPE uuid USING business_user_id::uuid;

      ALTER TABLE proposals
        ADD CONSTRAINT fk_proposals_business_user
        FOREIGN KEY (business_user_id)
        REFERENCES business_users (id)
        ON DELETE CASCADE;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE proposals;
    `);
  }
}
