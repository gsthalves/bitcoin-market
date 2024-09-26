import { ILoggerAdapter } from "@/application/adapters";
import {
  AccountNotExistsError,
  CollectBitcoinPriceError,
} from "@/application/errors";
import { IBitcoinHistoryRepository } from "@/application/repositories";
import { BitcoinHistoryEntity } from "@/domain/entities";
import { IGetBitcoinPriceService } from "@/domain/services";
import { ICollectBitcoinPriceUseCase } from "@/domain/use-cases";

export class CollectBitcoinPriceUseCase implements ICollectBitcoinPriceUseCase {
  constructor(
    private readonly logger: ILoggerAdapter,
    private readonly bitcoinHistoryRepository: IBitcoinHistoryRepository,
    private readonly getBitcoinPriceService: IGetBitcoinPriceService
  ) {}

  async execute(): Promise<void> {
    this.logger.info(
      "CollectBitcoinPriceUseCase.execute",
      "Started collect bitcoin price."
    );

    try {
      const bitcoinPrice = await this.getBitcoinPriceService.execute();

      const bitcoinHistory = new BitcoinHistoryEntity({
        date: new Date(),
        high: bitcoinPrice.high,
        low: bitcoinPrice.low,
        vol: bitcoinPrice.vol,
        last: bitcoinPrice.last,
        buy: bitcoinPrice.buy,
        sell: bitcoinPrice.sell,
        open: bitcoinPrice.open,
      });

      await this.bitcoinHistoryRepository.create(bitcoinHistory);

      this.logger.info(
        "CollectBitcoinPriceUseCase.execute",
        "Finished collect bitcoin price."
      );
    } catch (error) {
      this.logger.error(
        "CollectBitcoinPriceUseCase.execute",
        "Error to collect bitcoin price."
      );

      if (error instanceof AccountNotExistsError) throw error;

      throw new CollectBitcoinPriceError("Error to collect bitcoin price.");
    }
  }
}
