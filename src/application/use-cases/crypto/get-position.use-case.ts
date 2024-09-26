import { ILoggerAdapter } from "@/application/adapters";
import { AccountNotExistsError, GetPositionError } from "@/application/errors";
import {
  IAccountRepository,
  IBalanceRepository,
  ITransactionRepository,
} from "@/application/repositories";
import { CurrencyType, TransactionType } from "@/domain/enums";
import { IGetBitcoinPriceService } from "@/domain/services";
import { IGetPositionUseCase } from "@/domain/use-cases";

export class GetPositionUseCase implements IGetPositionUseCase {
  constructor(
    private readonly logger: ILoggerAdapter,
    private readonly accountRepository: IAccountRepository,
    private readonly transactionRepository: ITransactionRepository,
    private readonly balanceRepository: IBalanceRepository,
    private readonly getBitcoinPriceService: IGetBitcoinPriceService
  ) {}

  async execute(
    input: IGetPositionUseCase.ExecuteInput
  ): Promise<IGetPositionUseCase.ExecuteOutput> {
    this.logger.info("GetPositionUseCase.execute", "Started get position.");

    try {
      const account = await this.accountRepository.findById(input.user);

      if (!account) throw new AccountNotExistsError("Account not exists.");

      const bitcoinPrice = await this.getBitcoinPriceService.execute();

      const transactions =
        await this.transactionRepository.findTransactionsByTypeAndCurrency(
          account.id,
          TransactionType.DEPOSIT,
          CurrencyType.BTC
        );

      let investments: {
        date: string;
        valueInvested: number;
        bitcoinValueInPurchase: number;
        percentageVariation: number;
      }[] = [];

      if (transactions && transactions.length > 0) {
        investments = transactions.map((item) => ({
          date: item.date.toISOString(),
          valueInvested: item.exchangeRate * item.amount,
          bitcoinValueInPurchase: item.exchangeRate,
          percentageVariation: this.calculatePercentageVariation(
            item.exchangeRate,
            bitcoinPrice.sell
          ),
        }));
      }

      let currentGrossValue = 0;

      const balance = await this.balanceRepository.findByAccountAndCurrency(
        account.id,
        CurrencyType.BRL
      );

      if (balance) currentGrossValue = balance.amount * bitcoinPrice.sell;

      this.logger.info("GetPositionUseCase.execute", "Finished get position.");

      return {
        investments: investments,
        currentBtcValue: bitcoinPrice.last,
        currentGrossValue: currentGrossValue,
      };
    } catch (error) {
      this.logger.error("GetPositionUseCase.execute", "Error to get position.");

      if (error instanceof AccountNotExistsError) throw error;

      throw new GetPositionError("Error to get position.");
    }
  }

  private calculatePercentageVariation(
    bitcoinValueInPurchase: number,
    currentBitcoinValue: number
  ): number {
    return (
      ((currentBitcoinValue - bitcoinValueInPurchase) /
        bitcoinValueInPurchase) *
      100
    );
  }
}
