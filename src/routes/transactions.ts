import { FastifyInstance } from "fastify";
import { knex } from "../database";
import * as zod from "zod";
import { randomUUID } from "crypto";
import { getSessionId } from "../middleware/getCokkie";


export async function transactionRoutes(app: FastifyInstance) {
  // Adicionando um hook => para criar um plugin global que serve apenas para esse plugin
  
  app.addHook('preHandler', async(req, _res) =>{
    console.log('Plugin Global =>', req.method, req.url)
  })

  app.get(
    "/",
    { 
      // Utilizamos o preHandler para fazer a validacao com algumas funcoes neste caso verificamos se o sessionId existe
      preHandler: [getSessionId],
    },
    async (request, _response) => {
      const { sessionId } = request.cookies;
      console.log(sessionId);

      // Retornando transacoes cujo o sessionID seja o mesmo que o fornecido pelo nosso cokie
      const transactions = await knex("transactions")
        .where("session_id", sessionId)
        .select("*");

      return {
        transactions,
      };
    }
  );
  
  app.get(
    "/summary",
    {
      preHandler: [getSessionId],
    },
    async (request) => {
      const { sessionId } = request.cookies;
      
      const resultado = await knex("transactions")
        .where({
          session_id: sessionId
        })
        .sum("amount as totalAmount")
        .first();

      // Fazendo a validacao do meu resultado:

      const ResultSchema = zod.object({
        totalAmount: zod.number(),
      });

      
      const total = ResultSchema.parse(resultado);

      return { sumary: total };
    }
  );

  app.get(
    "/:id",
    {
      preHandler: [getSessionId],
    },
    async (request, _response) => {
      // Resgatando os parametros da minha funcao:
      const getTransactionParamsSchema = zod.object({
        id: zod.string().uuid(),
      });

      const params = getTransactionParamsSchema.parse(request.params);
      const { sessionId } = request.cookies;

      const transactionPerID = knex("transactions")
        .select("*")
        .where({
          id: params.id,
          session_id: sessionId
        })
        .first();

      return transactionPerID;
    }
  );

  app.post("/", async (request, response) => {
    const createNewTransactionSchema = zod.object({
      title: zod.string(),
      amount: zod.number(),
      type: zod.enum(["credit", "debit"]),
    });

    // Fazendo a verificao se os dados que vem do front end batem com o schema que fizemos para nossa transacao
    // Note que, caso nao passe o parse gera um Erro e tudo que está a baixo nao é retornado

    const body = createNewTransactionSchema.parse(request.body);

    const { title, amount, type } = body;

    let sessionId = request.cookies.sessionId

    // Verificando se há um cookie para aquele usuario

    if(!sessionId){
      sessionId = randomUUID()

      response.setCookie('sessionId', sessionId, {
        // path define quais rotas do meu backEnd pode acessar esse cookie
        path:'/',
        // max Age define quanto tempo esse cookie dever durar no navegador do usuario 
        maxAge: 60 * 60 * 24 * 7 // 7 dias
      })
    }

    await knex("transactions").insert({
      id: crypto.randomUUID(),
      title,
      amount: type === "credit" ? amount : amount * -1,
      session_id: sessionId
    })

    response.status(201).send("New transaction created");
  });
}
