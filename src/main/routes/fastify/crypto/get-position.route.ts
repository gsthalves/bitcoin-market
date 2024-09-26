import { FastifyInstance, FastifyRequest } from "fastify";
import {
  IUserRequest,
  fastifyAuthenticateMiddleware,
} from "@/main/middlewares";
import { makeGetPositionController } from "@/main/factories";

const getPositionRoute = async (fastify: FastifyInstance) => {
  fastify.addHook("onRequest", fastifyAuthenticateMiddleware);

  fastify.get("/btc", async (request: FastifyRequest<IUserRequest>, reply) => {
    const controller = makeGetPositionController();

    const response = await controller.execute({
      user: request.params?.user,
    });

    reply.code(response.statusCode).send(response.data);

    reply.code(200).send(response.data);
  });
};

export { getPositionRoute };
