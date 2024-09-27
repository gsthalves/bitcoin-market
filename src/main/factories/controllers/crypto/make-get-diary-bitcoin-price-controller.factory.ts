import {
  makeGetDiaryBitcoinPriceUseCase,
  makeLoggerAdapter,
} from "@/main/factories";
import { GetDiaryBitcoinPriceController } from "@/presentation/controllers";

const makeGetDiaryBitcoinPriceController = () => {
  const logger = makeLoggerAdapter();
  const getDiaryBitcoinPriceUseCase = makeGetDiaryBitcoinPriceUseCase();

  const controller = new GetDiaryBitcoinPriceController(
    logger,
    getDiaryBitcoinPriceUseCase
  );

  return controller;
};

export { makeGetDiaryBitcoinPriceController };
