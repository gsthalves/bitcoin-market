import {
  makeBitcoinHistoryRepository,
  makeLoggerAdapter,
} from "@/main/factories";
import { PurgeOldBitcoinHistoryUseCase } from "@/application/use-cases";
import { IPurgeOldBitcoinHistoryUseCase } from "@/domain/use-cases";

const makePurgeOldBitcoinHistoryUseCase =
  (): IPurgeOldBitcoinHistoryUseCase => {
    const logger = makeLoggerAdapter();
    const bitcoinHistoryRepository = makeBitcoinHistoryRepository();

    const useCase = new PurgeOldBitcoinHistoryUseCase(
      logger,
      bitcoinHistoryRepository
    );

    return useCase;
  };

export { makePurgeOldBitcoinHistoryUseCase };
