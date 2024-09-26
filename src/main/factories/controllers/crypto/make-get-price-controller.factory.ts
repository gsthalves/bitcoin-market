import { makeGetPriceUseCase, makeLoggerAdapter } from "@/main/factories";
import { GetPriceController } from "@/presentation/controllers";

const makeGetPriceController = () => {
  const logger = makeLoggerAdapter();
  const getPriceUseCase = makeGetPriceUseCase();

  const controller = new GetPriceController(logger, getPriceUseCase);

  return controller;
};

export { makeGetPriceController };
