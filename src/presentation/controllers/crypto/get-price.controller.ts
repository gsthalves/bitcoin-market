import { ILoggerAdapter } from "@/application/adapters";
import { IGetPriceUseCase } from "@/domain/use-cases";
import { ControllerResponse, IController } from "@/presentation/contracts";
import { StatusCode } from "@/common/enums";

export class GetPriceController implements IController {
  constructor(
    private readonly logger: ILoggerAdapter,
    private readonly getPriceUseCase: IGetPriceUseCase
  ) {}

  async execute(input: any): Promise<ControllerResponse> {
    this.logger.info(
      "GetPriceController.execute",
      "Executing account get price."
    );

    const response = await this.getPriceUseCase.execute({
      user: input.user,
    });

    this.logger.info(
      "GetPriceController.execute",
      "Finished account get price."
    );

    return {
      data: response,
      statusCode: StatusCode.SUCCESS,
    };
  }
}
