import { ILoggerAdapter } from "@/application/adapters";
import { IGetDiaryBitcoinPriceUseCase } from "@/domain/use-cases";
import { ControllerResponse, IController } from "@/presentation/contracts";
import { StatusCode } from "@/common/enums";

export class GetDiaryBitcoinPriceController implements IController {
  constructor(
    private readonly logger: ILoggerAdapter,
    private readonly getDiaryBitcoinPriceUseCase: IGetDiaryBitcoinPriceUseCase
  ) {}

  async execute(input: any): Promise<ControllerResponse> {
    this.logger.info(
      "GetDiaryBitcoinPriceController.execute",
      "Executing account get diary bitcoin price."
    );

    const response = await this.getDiaryBitcoinPriceUseCase.execute({
      user: input.user,
    });

    this.logger.info(
      "GetDiaryBitcoinPriceController.execute",
      "Finished account get diary bitcoin price."
    );

    return {
      data: response,
      statusCode: StatusCode.SUCCESS,
    };
  }
}
