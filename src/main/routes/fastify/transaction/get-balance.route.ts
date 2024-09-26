import { FastifyInstance, FastifyRequest } from "fastify";
import {
  IUserRequest,
  fastifyAuthenticateMiddleware,
} from "@/main/middlewares";
import { makeGetBalanceController } from "@/main/factories";

const getBalanceRoute = async (fastify: FastifyInstance) => {
  fastify.addHook("onRequest", fastifyAuthenticateMiddleware);

  fastify.get(
    "/account/balance",
    async (request: FastifyRequest<IUserRequest>, reply) => {
      const controller = makeGetBalanceController();

      const response = await controller.execute({
        user: request.params?.user,
      });

      reply.code(response.statusCode).send(response.data);

      reply.code(200).send(response.data);
    }
  );
};

export { getBalanceRoute };
