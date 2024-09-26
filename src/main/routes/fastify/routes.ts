import { FastifyInstance } from "fastify";
import {
  authenticateRoute,
  createAccountRoute,
  depositRoute,
  getBalanceRoute,
  getDiaryVolumeRoute,
  getExtractRoute,
  getPositionRoute,
  getPriceRoute,
  purchaseRoute,
  sellRoute,
} from "@/main/routes";

const routes = async (fastify: FastifyInstance) => {
  fastify.register(createAccountRoute);
  fastify.register(authenticateRoute);
  fastify.register(depositRoute);
  fastify.register(getBalanceRoute);
  fastify.register(getPriceRoute);
  fastify.register(purchaseRoute);
  fastify.register(sellRoute);
  fastify.register(getPositionRoute);
  fastify.register(getExtractRoute);
  fastify.register(getDiaryVolumeRoute);
};

export { routes };
