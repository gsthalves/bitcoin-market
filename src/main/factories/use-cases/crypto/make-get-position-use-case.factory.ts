import {
  makeAccountRepository,
  makeBalanceRepository,
  makeLoggerAdapter,
  makeTransactionRepository,
} from "@/main/factories";
import { GetPositionUseCase } from "@/application/use-cases";
import { IGetPositionUseCase } from "@/domain/use-cases";
import { makeGetBitcoinPriceService } from "@/main/factories";

const makeGetPositionUseCase = (): IGetPositionUseCase => {
  const logger = makeLoggerAdapter();
  const accountRepository = makeAccountRepository();
  const transactionRepository = makeTransactionRepository();
  const balanceRepository = makeBalanceRepository();
  const getBitcoinService = makeGetBitcoinPriceService();

  const useCase = new GetPositionUseCase(
    logger,
    accountRepository,
    transactionRepository,
    balanceRepository,
    getBitcoinService
  );

  return useCase;
};

export { makeGetPositionUseCase };
