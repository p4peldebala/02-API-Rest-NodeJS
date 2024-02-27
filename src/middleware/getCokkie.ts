import { FastifyReply, FastifyRequest } from "fastify"

export async function getSessionId(request: FastifyRequest, response: FastifyReply) {
  const sessionId = request.cookies.sessionId;

  // Verificando se há o cookie
  if (!sessionId) {
    return response.status(401).send({
      error: "Unauthorized for this action",
    });
  }
}