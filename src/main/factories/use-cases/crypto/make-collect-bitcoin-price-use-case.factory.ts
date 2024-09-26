import {
  makeBitcoinHistoryRepository,
  makeLoggerAdapter,
} from "@/main/factories";
import { CollectBitcoinPriceUseCase } from "@/application/use-cases";
import { ICollectBitcoinPriceUseCase } from "@/domain/use-cases";
import { makeGetBitcoinPriceService } from "@/main/factories";

const makeCollectBitcoinPriceUseCase = (): ICollectBitcoinPriceUseCase => {
  const logger = makeLoggerAdapter();
  const bitcoinHistoryRepository = makeBitcoinHistoryRepository();
  const getBitcoinService = makeGetBitcoinPriceService();

  const useCase = new CollectBitcoinPriceUseCase(
    logger,
    bitcoinHistoryRepository,
    getBitcoinService
  );

  return useCase;
};

export { makeCollectBitcoinPriceUseCase };
