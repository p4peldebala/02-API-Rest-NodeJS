
import { knex as setupKnex, Knex} from "knex";
import { env } from "./env";

// resgatando nossa variaveis ambiente => atraves do proc

export const configKnex: Knex.Config = {
    client: 'sqlite',
    connection:{
        // resgatando nossa variaveis ambiente => atraves do process.env
        
        filename: env.DATABASE_URL
    }, 
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: './database/migrations'
    }
}

export const knex = setupKnex(configKnex)