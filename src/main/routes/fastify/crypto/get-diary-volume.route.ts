import { FastifyInstance, FastifyRequest } from "fastify";
import {
  IUserRequest,
  fastifyAuthenticateMiddleware,
} from "@/main/middlewares";
import { makeGetDiaryVolumeController } from "@/main/factories";

const getDiaryVolumeRoute = async (fastify: FastifyInstance) => {
  fastify.addHook("onRequest", fastifyAuthenticateMiddleware);

  fastify.get(
    "/volume",
    async (request: FastifyRequest<IUserRequest>, reply) => {
      const controller = makeGetDiaryVolumeController();

      const response = await controller.execute({
        user: request.params?.user,
      });

      reply.code(response.statusCode).send(response.data);

      reply.code(200).send(response.data);
    }
  );
};

export { getDiaryVolumeRoute };
