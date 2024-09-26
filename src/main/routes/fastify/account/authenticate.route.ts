import { FastifyInstance } from "fastify";
import { makeAuthenticateController } from "@/main/factories/controllers";

const authenticateRoute = async (fastify: FastifyInstance) => {
  fastify.post("/login", async (request, reply) => {
    const controller = makeAuthenticateController();

    const response = await controller.execute(request.body);

    reply.code(response.statusCode).send(response.data);
  });
};

export { authenticateRoute };
