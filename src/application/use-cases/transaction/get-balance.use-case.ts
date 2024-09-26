import { ILoggerAdapter } from "@/application/adapters";
import { AccountNotExistsError, GetBalanceError } from "@/application/errors";
import {
  IAccountRepository,
  IBalanceRepository,
} from "@/application/repositories";
import { CurrencyType } from "@/domain/enums";
import { IGetBalanceUseCase } from "@/domain/use-cases";

export class GetBalanceUseCase implements IGetBalanceUseCase {
  constructor(
    private readonly logger: ILoggerAdapter,
    private readonly accountRepository: IAccountRepository,
    private readonly balanceRepository: IBalanceRepository
  ) {}

  async execute(
    input: IGetBalanceUseCase.ExecuteInput
  ): Promise<IGetBalanceUseCase.ExecuteOutput> {
    this.logger.info(
      "GetBalanceUseCase.execute",
      "Started get account balance."
    );

    try {
      const account = await this.accountRepository.findById(input.user);

      if (!account) throw new AccountNotExistsError("Account not exists.");

      const balance = await this.balanceRepository.findByAccountAndCurrency(
        account.id,
        CurrencyType.BRL
      );

      this.logger.info(
        "GetBalanceUseCase.execute",
        "Finished get account balance."
      );

      return {
        balance: balance?.amount || 0,
      };
    } catch (error) {
      this.logger.error(
        "GetBalanceUseCase.execute",
        "Error to get account balance."
      );

      if (error instanceof AccountNotExistsError) throw error;

      throw new GetBalanceError("Error to get account balance.");
    }
  }
}
