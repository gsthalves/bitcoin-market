import { FastifyInstance, FastifyRequest } from "fastify";
import {
  IUserRequest,
  fastifyAuthenticateMiddleware,
} from "@/main/middlewares";
import { makeDepositController } from "@/main/factories";

const depositRoute = async (fastify: FastifyInstance) => {
  fastify.addHook("onRequest", fastifyAuthenticateMiddleware);

  fastify.post(
    "/account/deposit",
    async (request: FastifyRequest<IUserRequest>, reply) => {
      const controller = makeDepositController();

      const response = await controller.execute({
        user: request.params?.user,
        ...(request.body as any),
      });

      reply.code(response.statusCode).send(response.data);

      reply.code(200).send(response.data);
    }
  );
};

export { depositRoute };
