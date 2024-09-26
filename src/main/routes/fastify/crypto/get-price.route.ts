import { FastifyInstance, FastifyRequest } from "fastify";
import {
  IUserRequest,
  fastifyAuthenticateMiddleware,
} from "@/main/middlewares";
import { makeGetPriceController } from "@/main/factories";

const getPriceRoute = async (fastify: FastifyInstance) => {
  fastify.addHook("onRequest", fastifyAuthenticateMiddleware);

  fastify.get(
    "/btc/price",
    async (request: FastifyRequest<IUserRequest>, reply) => {
      const controller = makeGetPriceController();

      const response = await controller.execute({
        user: request.params?.user,
      });

      reply.code(response.statusCode).send(response.data);

      reply.code(200).send(response.data);
    }
  );
};

export { getPriceRoute };
