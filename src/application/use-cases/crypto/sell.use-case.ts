import { ILoggerAdapter } from "@/application/adapters";
import {
  AccountNotExistsError,
  InsufficientBalanceError,
  SellError,
} from "@/application/errors";
import {
  IAccountRepository,
  IBalanceRepository,
  ITransactionRepository,
} from "@/application/repositories";
import { TransactionEntity } from "@/domain/entities";
import { CurrencyType, TransactionType } from "@/domain/enums";
import { IGetBitcoinPriceService } from "@/domain/services";
import { ISellUseCase } from "@/domain/use-cases";

export class SellUseCase implements ISellUseCase {
  constructor(
    private readonly logger: ILoggerAdapter,
    private readonly accountRepository: IAccountRepository,
    private readonly transactionRepository: ITransactionRepository,
    private readonly balanceRepository: IBalanceRepository,
    private readonly getBitcoinPriceService: IGetBitcoinPriceService
  ) {}

  async execute(
    input: ISellUseCase.ExecuteInput
  ): Promise<ISellUseCase.ExecuteOutput> {
    this.logger.info("SellUseCase.execute", "Started sell.");

    try {
      const account = await this.accountRepository.findById(input.user);

      if (!account) throw new AccountNotExistsError("Account not exists.");

      const { sell } = await this.getBitcoinPriceService.execute();

      const btcBalance = await this.balanceRepository.findByAccountAndCurrency(
        account.id,
        CurrencyType.BTC
      );

      if (!btcBalance || btcBalance.amount < input.amount)
        throw new InsufficientBalanceError("Insufficient balance.");

      const totalValueInBrl = input.amount * sell;

      const exchangeRate = totalValueInBrl / input.amount;

      const originEntity = new TransactionEntity({
        accountId: account.id,
        type: TransactionType.WITHDRAWAL,
        currency: CurrencyType.BTC,
        exchangeRate: exchangeRate,
        amount: input.amount,
        date: new Date(),
      });

      const destinationEntity = new TransactionEntity({
        accountId: account.id,
        type: TransactionType.DEPOSIT,
        currency: CurrencyType.BRL,
        exchangeRate: 0,
        amount: totalValueInBrl,
        date: new Date(),
      });

      await this.transactionRepository.sell(originEntity, destinationEntity);

      const balance = await this.balanceRepository.findByAccountAndCurrency(
        account.id,
        CurrencyType.BTC
      );

      this.logger.info("SellUseCase.execute", "Finished sell.");

      return {
        balance: balance?.amount || 0,
      };
    } catch (error) {
      this.logger.error("SellUseCase.execute", "Error to sell.");

      if (error instanceof AccountNotExistsError) throw error;
      if (error instanceof InsufficientBalanceError) throw error;

      throw new SellError("Error to sell.");
    }
  }
}
