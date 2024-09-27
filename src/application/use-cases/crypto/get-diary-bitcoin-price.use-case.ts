import { ILoggerAdapter } from "@/application/adapters";
import {
  AccountNotExistsError,
  GetDiaryBitcoinPriceError,
} from "@/application/errors";
import {
  IAccountRepository,
  IBitcoinHistoryRepository,
} from "@/application/repositories";
import { IGetDiaryBitcoinPriceUseCase } from "@/domain/use-cases";

export class GetDiaryBitcoinPriceUseCase
  implements IGetDiaryBitcoinPriceUseCase
{
  constructor(
    private readonly logger: ILoggerAdapter,
    private readonly accountRepository: IAccountRepository,
    private readonly bitcoinHistory: IBitcoinHistoryRepository
  ) {}

  async execute(
    input: IGetDiaryBitcoinPriceUseCase.ExecuteInput
  ): Promise<IGetDiaryBitcoinPriceUseCase.ExecuteOutput> {
    this.logger.info(
      "GetDiaryBitcoinPriceUseCase.execute",
      "Started get diary bitcoin price."
    );

    try {
      const account = await this.accountRepository.findById(input.user);

      if (!account) throw new AccountNotExistsError("Account not exists.");

      const startDate = new Date();
      const endDate = new Date();

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);

      endDate.setDate(endDate.getDate() + 1);

      const history = await this.bitcoinHistory.findByPeriod(
        startDate,
        endDate
      );

      this.logger.info(
        "GetDiaryBitcoinPriceUseCase.execute",
        "Finished get diary bitcoin price."
      );

      return {
        history:
          history && history.length > 0
            ? history.map((item) => ({
                date: item.date,
                high: item.high,
                low: item.low,
                vol: item.vol,
                last: item.last,
                buy: item.buy,
                sell: item.sell,
                open: item.open,
              }))
            : [],
      };
    } catch (error) {
      this.logger.error(
        "GetDiaryBitcoinPriceUseCase.execute",
        "Error to get diary bitcoin price."
      );

      if (error instanceof AccountNotExistsError) throw error;

      throw new GetDiaryBitcoinPriceError("Error to get diary bitcoin price.");
    }
  }
}
