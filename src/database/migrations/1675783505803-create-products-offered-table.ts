import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createProductsOfferedTable1675783505803
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products_offered',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'products_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'proposal_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'FK_products_offered_products',
            referencedTableName: 'products',
            referencedColumnNames: ['id'],
            columnNames: ['products_id'],
            onDelete: 'CASCADE',
          },
          {
            name: 'FK_products_offered_proposal',
            referencedTableName: 'proposals',
            referencedColumnNames: ['id'],
            columnNames: ['proposal_id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products_offered');
  }
}
