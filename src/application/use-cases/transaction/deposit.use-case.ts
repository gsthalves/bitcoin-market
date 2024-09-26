import { ILoggerAdapter } from "@/application/adapters";
import { AccountNotExistsError, DepositError } from "@/application/errors";
import {
  IAccountRepository,
  IBalanceRepository,
  ITransactionRepository,
} from "@/application/repositories";
import { TransactionEntity } from "@/domain/entities";
import { CurrencyType, TransactionType } from "@/domain/enums";
import { IDepositUseCase } from "@/domain/use-cases";

export class DepositUseCase implements IDepositUseCase {
  constructor(
    private readonly logger: ILoggerAdapter,
    private readonly accountRepository: IAccountRepository,
    private readonly transactionRepository: ITransactionRepository,
    private readonly balanceRepository: IBalanceRepository
  ) {}

  async execute(
    input: IDepositUseCase.ExecuteInput
  ): Promise<IDepositUseCase.ExecuteOutput> {
    this.logger.info("DepositUseCase.execute", "Started account deposit.");

    try {
      const account = await this.accountRepository.findById(input.user);

      if (!account) throw new AccountNotExistsError("Account not exists.");

      const transaction = new TransactionEntity({
        accountId: account.id,
        type: TransactionType.DEPOSIT,
        currency: CurrencyType.BRL,
        exchangeRate: 0,
        amount: input.amount,
        date: new Date(),
      });

      await this.transactionRepository.deposit(transaction.deposit());

      const balance = await this.balanceRepository.findByAccountAndCurrency(
        account.id,
        CurrencyType.BRL
      );

      this.logger.info("DepositUseCase.execute", "Finished account deposit.");

      return {
        balance: balance?.amount || 0,
      };
    } catch (error) {
      this.logger.error("DepositUseCase.execute", "Error to account deposit.");

      if (error instanceof AccountNotExistsError) throw error;

      throw new DepositError("Error to account deposit.");
    }
  }
}
