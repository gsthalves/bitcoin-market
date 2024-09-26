import { ILoggerAdapter } from "@/application/adapters";
import { ICollectBitcoinPriceUseCase } from "@/domain/use-cases";
import { ControllerResponse, IController } from "@/presentation/contracts";
import { StatusCode } from "@/common/enums";

export class CollectBitcoinPriceController implements IController {
  constructor(
    private readonly logger: ILoggerAdapter,
    private readonly collectBitcoinPriceUseCase: ICollectBitcoinPriceUseCase
  ) {}

  async execute(): Promise<ControllerResponse> {
    this.logger.info(
      "CollectBitcoinPriceController.execute",
      "Executing collect bitcoin price."
    );

    await this.collectBitcoinPriceUseCase.execute();

    this.logger.info(
      "CollectBitcoinPriceController.execute",
      "Finished collect bitcoin price."
    );

    return {
      data: {},
      statusCode: StatusCode.SUCCESS,
    };
  }
}
