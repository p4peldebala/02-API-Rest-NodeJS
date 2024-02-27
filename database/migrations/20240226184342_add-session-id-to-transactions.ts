import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('transactions', (tabela) =>{
        // Alterando dados da tabela
        tabela.uuid('session_id').after('id').index()
    })
}

// Note que o drop sempre fará o contrario do up

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('transactions', (tabela) =>{
        // Deletando a coluna criaada
        tabela.dropColumn('session_id')
    })
}
