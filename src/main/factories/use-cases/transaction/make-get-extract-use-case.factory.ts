import {
  makeAccountRepository,
  makeBalanceRepository,
  makeLoggerAdapter,
  makeTransactionRepository,
} from "@/main/factories";
import { GetExtractUseCase } from "@/application/use-cases";
import { IGetExtractUseCase } from "@/domain/use-cases";

const makeGetExtractUseCase = (): IGetExtractUseCase => {
  const logger = makeLoggerAdapter();
  const accountRepository = makeAccountRepository();
  const transactionRepository = makeTransactionRepository();
  const balanceRepository = makeBalanceRepository();

  const useCase = new GetExtractUseCase(
    logger,
    accountRepository,
    transactionRepository,
    balanceRepository
  );

  return useCase;
};

export { makeGetExtractUseCase };
