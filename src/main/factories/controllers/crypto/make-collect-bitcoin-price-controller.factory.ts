import {
  makeCollectBitcoinPriceUseCase,
  makeLoggerAdapter,
} from "@/main/factories";
import { CollectBitcoinPriceController } from "@/presentation/controllers";

const makeCollectBitcoinPriceController = () => {
  const logger = makeLoggerAdapter();
  const collectBitcoinPriceUseCase = makeCollectBitcoinPriceUseCase();

  const controller = new CollectBitcoinPriceController(
    logger,
    collectBitcoinPriceUseCase
  );

  return controller;
};

export { makeCollectBitcoinPriceController };
