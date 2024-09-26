import { ILoggerAdapter } from "@/application/adapters";
import {
  AccountNotExistsError,
  GetDiaryVolumeError,
} from "@/application/errors";
import {
  IAccountRepository,
  ITransactionRepository,
} from "@/application/repositories";
import { CurrencyType, TransactionType } from "@/domain/enums";
import { IGetDiaryVolumeUseCase } from "@/domain/use-cases";

export class GetDiaryVolumeUseCase implements IGetDiaryVolumeUseCase {
  constructor(
    private readonly logger: ILoggerAdapter,
    private readonly accountRepository: IAccountRepository,
    private readonly transactionRepository: ITransactionRepository
  ) {}

  async execute(
    input: IGetDiaryVolumeUseCase.ExecuteInput
  ): Promise<IGetDiaryVolumeUseCase.ExecuteOutput> {
    this.logger.info(
      "GetDiaryVolumeUseCase.execute",
      "Started get diary volume."
    );

    try {
      const account = await this.accountRepository.findById(input.user);

      if (!account) throw new AccountNotExistsError("Account not exists.");

      const startDate = new Date();
      const endDate = new Date();

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);

      endDate.setDate(endDate.getDate() + 1);

      const transactions =
        await this.transactionRepository.findTransactionsByCurrencyAndPeriod(
          CurrencyType.BTC,
          startDate,
          endDate
        );

      let purchased = 0;
      let sold = 0;

      if (transactions && transactions.length > 0) {
        purchased = transactions.reduce(
          (total, { amount, type }) =>
            total + (type === TransactionType.DEPOSIT ? amount : 0),
          0
        );

        sold = transactions.reduce(
          (total, { amount, type }) =>
            total + (type === TransactionType.WITHDRAWAL ? amount : 0),
          0
        );
      }

      this.logger.info(
        "GetDiaryVolumeUseCase.execute",
        "Finished get diary volume."
      );

      return {
        purchased: purchased,
        sold: sold,
      };
    } catch (error) {
      this.logger.error(
        "GetDiaryVolumeUseCase.execute",
        "Error to get diary volume."
      );

      if (error instanceof AccountNotExistsError) throw error;

      throw new GetDiaryVolumeError("Error to get diary volume.");
    }
  }
}
