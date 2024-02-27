"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
// up => significa o que essa migration vai fazer no nosso banco de dados
async function up(knex) {
    await knex.schema.createTable('transactions', (tabela) => {
        // Criando nossas primeira coluna
        tabela.uuid('id').primary();
        tabela.text('title').notNullable();
        tabela.double('amount').notNullable();
        tabela.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
    });
}
exports.up = up;
// down => deu merda no banco de dados por que voce exclui uma tabela que nao poderia, com o down ele retorna a mudança do up
// Caso voce crie uma migration errada voce pode usar -- migrate:rollback para desfazer as mudanças daquela migration e criar uma nova com o migrate:make <nomeDaMigrate> 
async function down(knex) {
    await knex.schema.dropTable('transactions');
}
exports.down = down;
