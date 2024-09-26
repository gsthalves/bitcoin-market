import { ILoggerAdapter } from "@/application/adapters";
import { IPurgeOldBitcoinHistoryUseCase } from "@/domain/use-cases";
import { ControllerResponse, IController } from "@/presentation/contracts";
import { StatusCode } from "@/common/enums";

export class PurgeOldBitcoinHistoryController implements IController {
  constructor(
    private readonly logger: ILoggerAdapter,
    private readonly purgeOldBitcoinHistoryUseCase: IPurgeOldBitcoinHistoryUseCase
  ) {}

  async execute(): Promise<ControllerResponse> {
    this.logger.info(
      "PurgeOldBitcoinHistoryController.execute",
      "Executing purge old bitcoin history."
    );

    await this.purgeOldBitcoinHistoryUseCase.execute();

    this.logger.info(
      "PurgeOldBitcoinHistoryController.execute",
      "Finished purge old bitcoin history."
    );

    return {
      data: {},
      statusCode: StatusCode.SUCCESS,
    };
  }
}
