import { MigrationInterface, QueryRunner } from 'typeorm';

export class createOldProposalsTable1675783355068
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TYPE \"old_proposal_status_enum\" AS ENUM('DRAFT', 'SENT', 'EXPIRED', 'ACCEPTED', 'DECLINED')",
    );
    await queryRunner.query(`
    CREATE TABLE old_proposals (
      id SERIAL PRIMARY KEY,
      proposal_id INTEGER NOT NULL,
      proposal_title VARCHAR(255) NOT NULL,
      customer_company_rep VARCHAR(255),
      business_id INTEGER NOT NULL,
      business_user_id VARCHAR(255) NOT NULL,
      customer_company_id INTEGER,
      paid_period VARCHAR(255),
      total_payment_price INTEGER,
      "status" "old_proposal_status_enum" NOT NULL DEFAULT 'DRAFT',
      expire_at TIMESTAMP,
      created_at TIMESTAMP NOT NULL DEFAULT now()
    );
    
    ALTER TABLE old_proposals
      ALTER COLUMN business_user_id TYPE uuid USING business_user_id::uuid;
    
    ALTER TABLE old_proposals
      ADD CONSTRAINT fk_old_proposals_business_user
      FOREIGN KEY (business_user_id)
      REFERENCES business_users (id)
      ON DELETE CASCADE;
    
    ALTER TABLE old_proposals
      ADD CONSTRAINT fk_old_proposals_proposal_id
      FOREIGN KEY (proposal_id)
      REFERENCES proposals (id)
      ON DELETE CASCADE;
    
    ALTER TABLE old_proposals
      ADD CONSTRAINT fk_old_proposals_business_id
      FOREIGN KEY (business_id)
      REFERENCES businesses (id)
      ON DELETE CASCADE;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE old_proposals;`);
  }
}
