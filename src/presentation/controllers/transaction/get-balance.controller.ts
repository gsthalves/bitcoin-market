import { ILoggerAdapter } from "@/application/adapters";
import { IGetBalanceUseCase } from "@/domain/use-cases";
import { ControllerResponse, IController } from "@/presentation/contracts";
import { StatusCode } from "@/common/enums";

export class GetBalanceController implements IController {
  constructor(
    private readonly logger: ILoggerAdapter,
    private readonly getBalanceUseCase: IGetBalanceUseCase
  ) {}

  async execute(input: any): Promise<ControllerResponse> {
    this.logger.info(
      "GetBalanceController.execute",
      "Executing account get balance."
    );

    const response = await this.getBalanceUseCase.execute({
      user: input.user,
    });

    this.logger.info(
      "GetBalanceController.execute",
      "Finished account get balance."
    );

    return {
      data: response,
      statusCode: StatusCode.SUCCESS,
    };
  }
}
