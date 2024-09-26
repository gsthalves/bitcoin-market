import { IHttpAdapter } from "@/application/adapters";
import { FetchAdapter } from "@/infrastructure/adapters";
import { makeLoggerAdapter } from "@/main/factories";

const makeHttpAdapter = (): IHttpAdapter => {
  const logger = makeLoggerAdapter();

  const http = new FetchAdapter(logger);

  return http;
};

export { makeHttpAdapter };
