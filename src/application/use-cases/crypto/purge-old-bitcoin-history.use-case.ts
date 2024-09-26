import { ILoggerAdapter } from "@/application/adapters";
import {
  AccountNotExistsError,
  PurgeOldBitcoinHistoryError,
} from "@/application/errors";
import { IBitcoinHistoryRepository } from "@/application/repositories";
import { ConfigurationError } from "@/common/errors";
import { IPurgeOldBitcoinHistoryUseCase } from "@/domain/use-cases";

export class PurgeOldBitcoinHistoryUseCase
  implements IPurgeOldBitcoinHistoryUseCase
{
  constructor(
    private readonly logger: ILoggerAdapter,
    private readonly bitcoinHistoryRepository: IBitcoinHistoryRepository
  ) {}

  async execute(): Promise<void> {
    this.logger.info(
      "PurgeOldBitcoinHistoryUseCase.execute",
      "Started purge old bitcoin history."
    );

    try {
      const { PURGE_BITCOIN_HISTORY_DAYS } = process.env;

      if (!PURGE_BITCOIN_HISTORY_DAYS) {
        this.logger.error(
          "GetExtractUseCase.execute",
          "PURGE_BITCOIN_HISTORY_DAYS env var not found."
        );

        throw new ConfigurationError("Internal configuration error.");
      }

      const date = new Date();
      date.setDate(date.getDate() - parseInt(PURGE_BITCOIN_HISTORY_DAYS));

      const purged = await this.bitcoinHistoryRepository.purgeOld(date);

      this.logger.info(
        "PurgeOldBitcoinHistoryUseCase.execute",
        `Purged ${purged} records.`
      );

      this.logger.info(
        "PurgeOldBitcoinHistoryUseCase.execute",
        "Finished purge old bitcoin history."
      );
    } catch (error) {
      this.logger.error(
        "PurgeOldBitcoinHistoryUseCase.execute",
        "Error to purge old bitcoin history."
      );

      if (error instanceof AccountNotExistsError) throw error;
      if (error instanceof ConfigurationError) throw error;

      throw new PurgeOldBitcoinHistoryError(
        "Error to purge old bitcoin history."
      );
    }
  }
}
