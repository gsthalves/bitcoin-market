import {
  makeAccountRepository,
  makeBalanceRepository,
  makeLoggerAdapter,
} from "@/main/factories";
import { GetBalanceUseCase } from "@/application/use-cases";
import { IGetBalanceUseCase } from "@/domain/use-cases";

const makeGetBalanceUseCase = (): IGetBalanceUseCase => {
  const logger = makeLoggerAdapter();
  const accountRepository = makeAccountRepository();
  const balanceRepository = makeBalanceRepository();

  const useCase = new GetBalanceUseCase(
    logger,
    accountRepository,
    balanceRepository
  );

  return useCase;
};

export { makeGetBalanceUseCase };
