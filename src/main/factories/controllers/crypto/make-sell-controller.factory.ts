import {
  makeSellUseCase,
  makeLoggerAdapter,
  makeValidatorAdapter,
} from "@/main/factories";
import { SellController } from "@/presentation/controllers";

const makeSellController = () => {
  const logger = makeLoggerAdapter();
  const validatorAdapter = makeValidatorAdapter();
  const sellUseCase = makeSellUseCase();

  const controller = new SellController(logger, validatorAdapter, sellUseCase);

  return controller;
};

export { makeSellController };
