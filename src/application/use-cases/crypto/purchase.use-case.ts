import { ILoggerAdapter } from "@/application/adapters";
import {
  AccountNotExistsError,
  InsufficientBalanceError,
  PurchaseError,
} from "@/application/errors";
import {
  IAccountRepository,
  IBalanceRepository,
  ITransactionRepository,
} from "@/application/repositories";
import { TransactionEntity } from "@/domain/entities";
import { CurrencyType, TransactionType } from "@/domain/enums";
import { IGetBitcoinPriceService } from "@/domain/services";
import { IPurchaseUseCase } from "@/domain/use-cases";

export class PurchaseUseCase implements IPurchaseUseCase {
  constructor(
    private readonly logger: ILoggerAdapter,
    private readonly accountRepository: IAccountRepository,
    private readonly transactionRepository: ITransactionRepository,
    private readonly balanceRepository: IBalanceRepository,
    private readonly getBitcoinPriceService: IGetBitcoinPriceService
  ) {}

  async execute(
    input: IPurchaseUseCase.ExecuteInput
  ): Promise<IPurchaseUseCase.ExecuteOutput> {
    this.logger.info("PurchaseUseCase.execute", "Started purchase.");

    try {
      const account = await this.accountRepository.findById(input.user);

      if (!account) throw new AccountNotExistsError("Account not exists.");

      const { buy } = await this.getBitcoinPriceService.execute();

      const brlBalance = await this.balanceRepository.findByAccountAndCurrency(
        account.id,
        CurrencyType.BRL
      );

      const totalCostInBrl = input.amount * buy;

      if (!brlBalance || brlBalance.amount < totalCostInBrl)
        throw new InsufficientBalanceError("Insufficient balance.");

      const exchangeRate = totalCostInBrl / input.amount;

      const originEntity = new TransactionEntity({
        accountId: account.id,
        type: TransactionType.WITHDRAWAL,
        currency: CurrencyType.BRL,
        exchangeRate: 0,
        amount: totalCostInBrl,
        date: new Date(),
      });

      const destinationEntity = new TransactionEntity({
        accountId: account.id,
        type: TransactionType.DEPOSIT,
        currency: CurrencyType.BTC,
        exchangeRate: exchangeRate,
        amount: input.amount,
        date: new Date(),
      });

      await this.transactionRepository.purchase(
        originEntity,
        destinationEntity
      );

      const balance = await this.balanceRepository.findByAccountAndCurrency(
        account.id,
        CurrencyType.BTC
      );

      this.logger.info("PurchaseUseCase.execute", "Finished purchase.");

      return {
        balance: balance?.amount || 0,
      };
    } catch (error) {
      this.logger.error("PurchaseUseCase.execute", "Error to purchase.");

      if (error instanceof AccountNotExistsError) throw error;
      if (error instanceof InsufficientBalanceError) throw error;

      throw new PurchaseError("Error to purchase.");
    }
  }
}
