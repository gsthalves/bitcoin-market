import { makeHttpAdapter, makeLoggerAdapter } from "@/main/factories";
import { GetBitcoinPriceService } from "@/application/services";
import { IGetBitcoinPriceService } from "@/domain/services";

const makeGetBitcoinPriceService = (): IGetBitcoinPriceService => {
  const logger = makeLoggerAdapter();
  const httpAdapter = makeHttpAdapter();

  const service = new GetBitcoinPriceService(logger, httpAdapter);

  return service;
};

export { makeGetBitcoinPriceService };
