import { IHttpAdapter, ILoggerAdapter } from "@/application/adapters";
import { UnexpectedHttpError } from "@/infrastructure/errors";

export class FetchAdapter implements IHttpAdapter {
  constructor(private readonly logger: ILoggerAdapter) {}

  async get<T = any>(
    input: IHttpAdapter.GetInput
  ): Promise<IHttpAdapter.GetOutput<T>> {
    this.logger.info("FetchAdapter.get", "Started get fetch.");

    try {
      const response = await fetch(input.url, {
        method: "GET",
      });

      const data = await response.json();

      this.logger.info("FetchAdapter.get", "Finished get fetch.");

      return {
        data: data as T,
        statusCode: response.status,
      };
    } catch (error: any) {
      this.logger.error("FetchAdapter.get", "Error to get fetch.");

      throw new UnexpectedHttpError("Error to sign jwt.", error.stack);
    }
  }
}
