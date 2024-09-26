import {
  makeAccountRepository,
  makeLoggerAdapter,
  makeTransactionRepository,
} from "@/main/factories";
import { GetDiaryVolumeUseCase } from "@/application/use-cases";
import { IGetDiaryVolumeUseCase } from "@/domain/use-cases";

const makeGetDiaryVolumeUseCase = (): IGetDiaryVolumeUseCase => {
  const logger = makeLoggerAdapter();
  const accountRepository = makeAccountRepository();
  const transactionRepository = makeTransactionRepository();

  const useCase = new GetDiaryVolumeUseCase(
    logger,
    accountRepository,
    transactionRepository
  );

  return useCase;
};

export { makeGetDiaryVolumeUseCase };
