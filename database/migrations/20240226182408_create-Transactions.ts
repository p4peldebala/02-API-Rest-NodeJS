import type { Knex } from "knex";

// up => significa o que essa migration vai fazer no nosso banco de dados
export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('transactions', (tabela) =>{
        // Criando nossas primeira coluna
        tabela.uuid('id').primary()
        tabela.text('title').notNullable()
        tabela.double('amount').notNullable()
        tabela.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable()
    })
}

// down => deu merda no banco de dados por que voce exclui uma tabela que nao poderia, com o down ele retorna a mudança do up
// Caso voce crie uma migration errada voce pode usar -- migrate:rollback para desfazer as mudanças daquela migration e criar uma nova com o migrate:make <nomeDaMigrate> 
export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('transactions')
}

