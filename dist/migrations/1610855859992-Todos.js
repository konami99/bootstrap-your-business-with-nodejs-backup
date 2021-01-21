"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todos1610855859992 = void 0;
const typeorm_1 = require("typeorm");
class Todos1610855859992 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
    async down(queryRunner) {
        await queryRunner.dropTable('todos');
    }
}
exports.Todos1610855859992 = Todos1610855859992;
