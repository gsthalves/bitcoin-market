import { makeGetDiaryVolumeUseCase, makeLoggerAdapter } from "@/main/factories";
import { GetDiaryVolumeController } from "@/presentation/controllers";

const makeGetDiaryVolumeController = () => {
  const logger = makeLoggerAdapter();
  const getDiaryVolumeUseCase = makeGetDiaryVolumeUseCase();

  const controller = new GetDiaryVolumeController(
    logger,
    getDiaryVolumeUseCase
  );

  return controller;
};

export { makeGetDiaryVolumeController };
