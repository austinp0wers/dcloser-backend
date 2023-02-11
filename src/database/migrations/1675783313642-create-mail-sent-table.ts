import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createMailSentTable1675783313642 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'mail_sent',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'use_password',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: true,
            default: null,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'business_user_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'sent_to',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'sent_email',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'proposal_id',
            type: 'integer',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['proposal_id'],
            referencedTableName: 'proposals',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('mail_sent');
  }
}
