import {
  makeAccountRepository,
  makeBalanceRepository,
  makeLoggerAdapter,
  makeTransactionRepository,
} from "@/main/factories";
import { PurchaseUseCase } from "@/application/use-cases";
import { IPurchaseUseCase } from "@/domain/use-cases";
import { makeGetBitcoinPriceService } from "@/main/factories";

const makePurchaseUseCase = (): IPurchaseUseCase => {
  const logger = makeLoggerAdapter();
  const accountRepository = makeAccountRepository();
  const transactionRepository = makeTransactionRepository();
  const balanceRepository = makeBalanceRepository();
  const getBitcoinService = makeGetBitcoinPriceService();

  const useCase = new PurchaseUseCase(
    logger,
    accountRepository,
    transactionRepository,
    balanceRepository,
    getBitcoinService
  );

  return useCase;
};

export { makePurchaseUseCase };
