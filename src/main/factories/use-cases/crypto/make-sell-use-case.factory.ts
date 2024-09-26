import {
  makeAccountRepository,
  makeBalanceRepository,
  makeLoggerAdapter,
  makeTransactionRepository,
} from "@/main/factories";
import { SellUseCase } from "@/application/use-cases";
import { ISellUseCase } from "@/domain/use-cases";
import { makeGetBitcoinPriceService } from "@/main/factories";

const makeSellUseCase = (): ISellUseCase => {
  const logger = makeLoggerAdapter();
  const accountRepository = makeAccountRepository();
  const transactionRepository = makeTransactionRepository();
  const balanceRepository = makeBalanceRepository();
  const getBitcoinService = makeGetBitcoinPriceService();

  const useCase = new SellUseCase(
    logger,
    accountRepository,
    transactionRepository,
    balanceRepository,
    getBitcoinService
  );

  return useCase;
};

export { makeSellUseCase };
