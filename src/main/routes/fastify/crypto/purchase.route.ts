import { FastifyInstance, FastifyRequest } from "fastify";
import {
  IUserRequest,
  fastifyAuthenticateMiddleware,
} from "@/main/middlewares";
import { makePurchaseController } from "@/main/factories";

const purchaseRoute = async (fastify: FastifyInstance) => {
  fastify.addHook("onRequest", fastifyAuthenticateMiddleware);

  fastify.post(
    "/btc/purchase",
    async (request: FastifyRequest<IUserRequest>, reply) => {
      const controller = makePurchaseController();

      const response = await controller.execute({
        user: request.params?.user,
        ...(request.body as any),
      });

      reply.code(response.statusCode).send(response.data);

      reply.code(200).send(response.data);
    }
  );
};

export { purchaseRoute };
