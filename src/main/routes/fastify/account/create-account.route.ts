import { FastifyInstance } from "fastify";
import { makeCreateAccountController } from "@/main/factories/controllers";

const createAccountRoute = async (fastify: FastifyInstance) => {
  fastify.post("/account", async (request, reply) => {
    const controller = makeCreateAccountController();

    const response = await controller.execute(request.body);

    reply.code(response.statusCode).send(response.data);
  });
};

export { createAccountRoute };
