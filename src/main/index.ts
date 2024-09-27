import dotenv from "dotenv";
import { FastifyServer } from "@/infrastructure/http";
import { makeLoggerAdapter } from "@/main/factories";
import { fastifyErrorHandler } from "@/main/middlewares";
import { routes } from "@/main/routes";
import { startCrons } from "@/main/crons";

dotenv.config();

const main = async () => {
  const host = process.env.APP_HOST ? process.env.APP_HOST : "0.0.0.0";
  const port = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000;

  const logger = makeLoggerAdapter();
  const server = new FastifyServer(logger);

  server.register(routes);
  server.setErrorHandler(fastifyErrorHandler);

  await server.start(host, port);

  startCrons(logger);
};

main();
