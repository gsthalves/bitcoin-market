import { ILoggerAdapter } from "@/application/adapters";
import { WinstonAdapter } from "@/infrastructure/adapters";

let logger: ILoggerAdapter;

const makeLoggerAdapter = (): ILoggerAdapter => {
  const appName = process.env.APP_NAME || "";
  const logLevel = process.env.LOG_LEVEL || "info";

  if (logger) return logger;

  logger = new WinstonAdapter(appName, logLevel);

  return logger;
};

export { makeLoggerAdapter };
