import {
  makeDepositUseCase,
  makeLoggerAdapter,
  makeValidatorAdapter,
} from "@/main/factories";
import { DepositController } from "@/presentation/controllers";

const makeDepositController = () => {
  const logger = makeLoggerAdapter();
  const depositUsecase = makeDepositUseCase();
  const validatorAdapter = makeValidatorAdapter();

  const controller = new DepositController(
    logger,
    validatorAdapter,
    depositUsecase
  );

  return controller;
};

export { makeDepositController };
