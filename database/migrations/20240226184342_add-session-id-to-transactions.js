"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.alterTable('transactions', (tabela) => {
        // Alterando dados da tabela
        tabela.uuid('session_id').after('id').index();
    });
}
exports.up = up;
// Note que o drop sempre fará o contrario do up
async function down(knex) {
    await knex.schema.alterTable('transactions', (tabela) => {
        // Deletando a coluna criaada
        tabela.dropColumn('session_id');
    });
}
exports.down = down;
