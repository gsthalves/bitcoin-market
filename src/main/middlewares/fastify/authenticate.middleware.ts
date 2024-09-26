import { ConfigurationError, UnauthorizedError } from "@/common/errors";
import { makeJwtAdapter, makeLoggerAdapter } from "@/main/factories";
import {
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
  RouteGenericInterface,
} from "fastify";

export interface IUserRequest extends RouteGenericInterface {
  Params: { user: string };
}

const fastifyAuthenticateMiddleware = (
  request: FastifyRequest<IUserRequest>,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) => {
  const logger = makeLoggerAdapter();

  logger.info(
    "fastifyAuthenticateMiddleware",
    "Started authenticate middleware."
  );

  const { JWT_SECRET } = process.env;

  if (!JWT_SECRET) {
    logger.error(
      "fastifyAuthenticateMiddleware",
      "JWT_SECRET env var not found."
    );

    throw new ConfigurationError("Internal configuration error.");
  }

  const authorization = request.headers["authorization"];

  if (!authorization) throw new UnauthorizedError("Unauthorized.");

  const jwtAdapter = makeJwtAdapter();

  const decoded = jwtAdapter.verify<{ id: string }>({
    token: authorization.replace("Bearer ", "").trim(),
    secret: JWT_SECRET,
  });

  request.params.user = decoded.data.id;

  logger.info(
    "fastifyAuthenticateMiddleware",
    "Finished authenticate middleware."
  );

  done();
};

export { fastifyAuthenticateMiddleware };
