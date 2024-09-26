import {
  makePurgeOldBitcoinHistoryUseCase,
  makeLoggerAdapter,
} from "@/main/factories";
import { PurgeOldBitcoinHistoryController } from "@/presentation/controllers";

const makePurgeOldBitcoinHistoryController = () => {
  const logger = makeLoggerAdapter();
  const purgeOldBitcoinHistoryUseCase = makePurgeOldBitcoinHistoryUseCase();

  const controller = new PurgeOldBitcoinHistoryController(
    logger,
    purgeOldBitcoinHistoryUseCase
  );

  return controller;
};

export { makePurgeOldBitcoinHistoryController };
