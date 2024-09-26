import { makeGetBalanceUseCase, makeLoggerAdapter } from "@/main/factories";
import { GetBalanceController } from "@/presentation/controllers";

const makeGetBalanceController = () => {
  const logger = makeLoggerAdapter();
  const getBalanceUseCase = makeGetBalanceUseCase();

  const controller = new GetBalanceController(logger, getBalanceUseCase);

  return controller;
};

export { makeGetBalanceController };
