import { FastifyInstance, FastifyRequest } from "fastify";
import {
  IUserRequest,
  fastifyAuthenticateMiddleware,
} from "@/main/middlewares";
import { makeSellController } from "@/main/factories";

const sellRoute = async (fastify: FastifyInstance) => {
  fastify.addHook("onRequest", fastifyAuthenticateMiddleware);

  fastify.post(
    "/btc/sell",
    async (request: FastifyRequest<IUserRequest>, reply) => {
      const controller = makeSellController();

      const response = await controller.execute({
        user: request.params?.user,
        ...(request.body as any),
      });

      reply.code(response.statusCode).send(response.data);

      reply.code(200).send(response.data);
    }
  );
};

export { sellRoute };
