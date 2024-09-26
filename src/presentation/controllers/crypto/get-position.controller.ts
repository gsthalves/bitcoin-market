import { ILoggerAdapter } from "@/application/adapters";
import { IGetPositionUseCase } from "@/domain/use-cases";
import { ControllerResponse, IController } from "@/presentation/contracts";
import { StatusCode } from "@/common/enums";

export class GetPositionController implements IController {
  constructor(
    private readonly logger: ILoggerAdapter,
    private readonly getPositionUseCase: IGetPositionUseCase
  ) {}

  async execute(input: any): Promise<ControllerResponse> {
    this.logger.info(
      "GetPositionController.execute",
      "Executing account get position."
    );

    const response = await this.getPositionUseCase.execute({
      user: input.user,
    });

    this.logger.info(
      "GetPositionController.execute",
      "Finished account get position."
    );

    return {
      data: response,
      statusCode: StatusCode.SUCCESS,
    };
  }
}
