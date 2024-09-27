import { FastifyInstance, FastifyRequest } from "fastify";
import {
  IUserRequest,
  fastifyAuthenticateMiddleware,
} from "@/main/middlewares";
import { makeGetDiaryBitcoinPriceController } from "@/main/factories";

const getDiaryBitcoinPriceRoute = async (fastify: FastifyInstance) => {
  fastify.addHook("onRequest", fastifyAuthenticateMiddleware);

  fastify.get(
    "/history",
    async (request: FastifyRequest<IUserRequest>, reply) => {
      const controller = makeGetDiaryBitcoinPriceController();

      const response = await controller.execute({
        user: request.params?.user,
      });

      reply.code(response.statusCode).send(response.data);

      reply.code(200).send(response.data);
    }
  );
};

export { getDiaryBitcoinPriceRoute };
