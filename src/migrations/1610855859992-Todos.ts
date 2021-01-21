import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Todos1610855859992 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'todos',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true
          },
          {
            name: 'text',
            type: 'varchar'
          }
        ]
      }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('todos');
    }

}
