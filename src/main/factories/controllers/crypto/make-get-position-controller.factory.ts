import { makeGetPositionUseCase, makeLoggerAdapter } from "@/main/factories";
import { GetPositionController } from "@/presentation/controllers";

const makeGetPositionController = () => {
  const logger = makeLoggerAdapter();
  const getPositionUseCase = makeGetPositionUseCase();

  const controller = new GetPositionController(logger, getPositionUseCase);

  return controller;
};

export { makeGetPositionController };
