import {
  makeGetExtractUseCase,
  makeLoggerAdapter,
  makeValidatorAdapter,
} from "@/main/factories";
import { GetExtractController } from "@/presentation/controllers";

const makeGetExtractController = () => {
  const logger = makeLoggerAdapter();
  const getExtractUsecase = makeGetExtractUseCase();
  const validatorAdapter = makeValidatorAdapter();

  const controller = new GetExtractController(
    logger,
    validatorAdapter,
    getExtractUsecase
  );

  return controller;
};

export { makeGetExtractController };
