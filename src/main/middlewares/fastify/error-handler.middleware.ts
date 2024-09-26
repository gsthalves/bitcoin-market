import { BadRequestError } from "@/common/errors";
import { makeLoggerAdapter } from "@/main/factories";
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

const fastifyErrorHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const logger = makeLoggerAdapter();

  logger.error("fastifyErrorHandler", error.message, {
    statusCode: error?.statusCode || 500,
    // internalError: error?.internalError || "GENERICERROR500",
    stack: error.stack,
  });

  if (error instanceof BadRequestError)
    reply.status(error.statusCode).send({
      statusCode: error.statusCode,
      error: "Bad Request",
      message: error.message,
      errors: error.errors,
    });

  throw error;
};

export { fastifyErrorHandler };
