import { ILoggerAdapter } from "@/application/adapters";
import { IGetDiaryVolumeUseCase } from "@/domain/use-cases";
import { ControllerResponse, IController } from "@/presentation/contracts";
import { StatusCode } from "@/common/enums";

export class GetDiaryVolumeController implements IController {
  constructor(
    private readonly logger: ILoggerAdapter,
    private readonly getDiaryVolumeUseCase: IGetDiaryVolumeUseCase
  ) {}

  async execute(input: any): Promise<ControllerResponse> {
    this.logger.info(
      "GetDiaryVolumeController.execute",
      "Executing account get diary volume."
    );

    const response = await this.getDiaryVolumeUseCase.execute({
      user: input.user,
    });

    this.logger.info(
      "GetDiaryVolumeController.execute",
      "Finished account get diary volume."
    );

    return {
      data: response,
      statusCode: StatusCode.SUCCESS,
    };
  }
}
