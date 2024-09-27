import { ILoggerAdapter } from "@/application/adapters";
import Fastify, {
  FastifyError,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";

export class FastifyServer {
  private fastify: FastifyInstance;

  constructor(private readonly logger: ILoggerAdapter) {
    this.fastify = Fastify();
  }

  public async start(host: string, port: number) {
    try {
      this.logger.info(
        "FastifyServer.start",
        `Starting Fastify server on port: ${port.toString()}.`
      );

      this.fastify.addHook("onRoute", (route) => {
        this.logger.info(
          "FastifyServer.start",
          `Mapped route: ${route.path}, ${route.method}`
        );
      });

      await this.fastify.listen(
        { host: host, port: port },
        (error, address) => {
          if (error) throw new Error(error.message);

          this.logger.info(
            "FastifyServer.start",
            `Fastify server started on: ${address}.`
          );
        }
      );
    } catch (error: any) {
      this.logger.info(
        "FastifyServer.start",
        `Failed to start Fastify server started on port: ${port.toString()}: ${
          error.message
        }.`
      );

      process.exit(1);
    }
  }

  public register(handler: (instance: FastifyInstance) => void) {
    this.fastify.register(handler);
  }

  public setErrorHandler(
    handler: (
      error: FastifyError,
      request: FastifyRequest,
      reply: FastifyReply
    ) => void
  ) {
    this.fastify.setErrorHandler(handler);
  }
}
