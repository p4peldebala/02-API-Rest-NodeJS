// Note que um arquivo d.ts significa um arquivo de definicao de tipos 

import { Knex } from "knex";

// Sobrescrevendo a interface de tabelas do knex para ter acesso a nossas tabelas 
interface TransactionsProps{
    id: string,
    title: string,
    amount: number,
    createdAt: string,
    session_id?: string
}
declare module 'knex/types/tables'{
    export interface Tables{
        transactions: TransactionsProps
    }
}

