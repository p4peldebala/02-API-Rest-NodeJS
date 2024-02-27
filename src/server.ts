import fastify from "fastify";
import { env } from "./env";
import { transactionRoutes } from "./routes/transactions";
import cookie from "@fastify/cookie";

const app = fastify();

// Criando cookies para validar as acoes de um usario mesmo que ele n esteja logado

app.register(cookie);

// Criando nosso plugin e definindo um prefixo para ele => ou seja em todas as rotas que comecem com /transactions

app.register(transactionRoutes, {
    prefix: "/transactions",
});

// Iremos utilizar o npm install --save @types/node para conseguirmos usar o typescript
// Utilizaremos o tsx para converter e executar nosso codigo de typescript para javascript com npm run dev => script para npx tsx src/server.ts

try {
    app.listen({
        port: env.PORT,
    }).then(() => console.log("Servidor iniciado"));
} catch (error) {
    app.log.error(error);
}
