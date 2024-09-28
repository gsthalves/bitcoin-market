import { ILoggerAdapter } from "@/application/adapters";
import {
  AccountNotExistsError,
  GetBalanceError,
  InvalidRangeDateError,
} from "@/application/errors";
import {
  IAccountRepository,
  IBalanceRepository,
  ITransactionRepository,
} from "@/application/repositories";
import { ConfigurationError } from "@/common/errors";
import { CurrencyType } from "@/domain/enums";
import { IGetExtractUseCase } from "@/domain/use-cases";

export class GetExtractUseCase implements IGetExtractUseCase {
  constructor(
    private readonly logger: ILoggerAdapter,
    private readonly accountRepository: IAccountRepository,
    private readonly transactionRepository: ITransactionRepository,
    private readonly balanceRepository: IBalanceRepository
  ) {}

  async execute(
    input: IGetExtractUseCase.ExecuteInput
  ): Promise<IGetExtractUseCase.ExecuteOutput> {
    this.logger.info(
      "GetExtractUseCase.execute",
      "Started get account extract."
    );

    try {
      const { EXTRACT_DEFAULT_INTERVAL } = process.env;

      if (!EXTRACT_DEFAULT_INTERVAL) {
        this.logger.error(
          "GetExtractUseCase.execute",
          "EXTRACT_DEFAULT_INTERVAL env var not found."
        );

        throw new ConfigurationError("Internal configuration error.");
      }

      const account = await this.accountRepository.findById(input.user);

      if (!account) throw new AccountNotExistsError("Account not exists.");

      let endDate = new Date();
      let startDate = new Date();

      startDate.setDate(
        startDate.getDate() - parseInt(EXTRACT_DEFAULT_INTERVAL)
      );

      if (input.startDate && input.endDate) {
        startDate = new Date(input.startDate);
        endDate = new Date(input.endDate);

        if (startDate > endDate)
          throw new InvalidRangeDateError(
            "startDate must be less than endDate."
          );

        endDate.setDate(endDate.getDate() + 1);
      }

      this.logger.info(
        "GetExtractUseCase.execute",
        `Filtering extract with period: ${startDate.toISOString()} and ${endDate.toISOString()}`
      );

      const balance = await this.balanceRepository.findByAccount(account.id);

      const transactions =
        await this.transactionRepository.findTransactionsByAccountAndPeriod(
          account.id,
          startDate,
          endDate
        );

      this.logger.info(
        "GetExtractUseCase.execute",
        "Finished get account extract."
      );

      let brlBalance = 0;

      if (balance && balance.length > 0) {
        const brlFilter = balance.find(
          (item) => item.currency === CurrencyType.BRL
        );

        if (brlFilter) brlBalance = brlFilter.amount;
      }

      let btcBalance = 0;

      if (balance && balance.length > 0) {
        const btcFilter = balance.find(
          (item) => item.currency === CurrencyType.BTC
        );

        if (btcFilter) btcBalance = btcFilter.amount;
      }

      return {
        brlBalance: brlBalance,
        btcBalance: btcBalance,
        transactions:
          transactions && transactions.length > 0
            ? transactions?.map((item) => ({
                id: item.id,
                type: item.type,
                currency: item.currency,
                date: item.date.toISOString(),
                amount: item.amount,
                btcPrice: item.exchangeRate,
              }))
            : [],
      };
    } catch (error) {
      this.logger.error(
        "GetExtractUseCase.execute",
        "Error to get account extract."
      );

      if (error instanceof AccountNotExistsError) throw error;
      if (error instanceof InvalidRangeDateError) throw error;
      if (error instanceof ConfigurationError) throw error;

      throw new GetBalanceError("Error to get account extract.");
    }
  }
}
