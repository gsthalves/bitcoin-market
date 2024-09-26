import { ILoggerAdapter } from "@/application/adapters";
import winston from "winston";

export class WinstonAdapter implements ILoggerAdapter {
  private logger: winston.Logger;

  constructor(appName: string, logLevel: string) {
    console.log("Creating new instance of logger");

    this.logger = winston.createLogger({
      level: logLevel,
      format: winston.format.json(),
      defaultMeta: { app: appName },
      transports: [new winston.transports.Console()],
    });
  }

  info(context: string, message: string, params?: any): void {
    this.logger.info(`[${context}] - ${message}`, params);
  }

  error(context: string, message: string, params: any): void {
    this.logger.error(`[${context}] - ${message}`, params);
  }
}
