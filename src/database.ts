import { knex as setupKnex, Knex } from 'knex'
import { env } from './env'

// resgatando nossa variaveis ambiente => atraves do proc

export const configKnex: Knex.Config = {
    client: env.DATABASE_CLIENT,
    connection:
        env.DATABASE_CLIENT === 'sqlite'
            ? {
                  filename: env.DATABASE_URL,
              }
            : env.DATABASE_URL,
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: './database/migrations',
    },
}

export const knex = setupKnex(configKnex)
