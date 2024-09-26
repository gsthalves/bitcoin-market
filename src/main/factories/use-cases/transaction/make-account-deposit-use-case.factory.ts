import {
  makeAccountRepository,
  makeBalanceRepository,
  makeLoggerAdapter,
  makeTransactionRepository,
} from "@/main/factories";
import { DepositUseCase } from "@/application/use-cases";
import { IDepositUseCase } from "@/domain/use-cases";

const makeDepositUseCase = (): IDepositUseCase => {
  const logger = makeLoggerAdapter();
  const accountRepository = makeAccountRepository();
  const transactionRepository = makeTransactionRepository();
  const balanceRepository = makeBalanceRepository();

  const useCase = new DepositUseCase(
    logger,
    accountRepository,
    transactionRepository,
    balanceRepository
  );

  return useCase;
};

export { makeDepositUseCase };
