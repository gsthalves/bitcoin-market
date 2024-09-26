import { FastifyInstance, FastifyRequest } from "fastify";
import {
  IUserRequest,
  fastifyAuthenticateMiddleware,
} from "@/main/middlewares";
import { makeGetExtractController } from "@/main/factories";

const getExtractRoute = async (fastify: FastifyInstance) => {
  fastify.addHook("onRequest", fastifyAuthenticateMiddleware);

  fastify.get(
    "/extract",
    {
      schema: {
        querystring: {
          type: "object",
          properties: {
            startDate: {
              type: "string",
            },
            endDate: {
              type: "string",
            },
          },
        },
      },
    },
    async (request: FastifyRequest<IUserRequest>, reply) => {
      const controller = makeGetExtractController();

      const response = await controller.execute({
        user: request.params?.user,
        ...(request.query as any),
      });

      reply.code(response.statusCode).send(response.data);

      reply.code(200).send(response.data);
    }
  );
};

export { getExtractRoute };
