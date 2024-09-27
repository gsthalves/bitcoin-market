import {
  makeAccountRepository,
  makeBitcoinHistoryRepository,
  makeLoggerAdapter,
} from "@/main/factories";
import { GetDiaryBitcoinPriceUseCase } from "@/application/use-cases";
import { IGetDiaryBitcoinPriceUseCase } from "@/domain/use-cases";

const makeGetDiaryBitcoinPriceUseCase = (): IGetDiaryBitcoinPriceUseCase => {
  const logger = makeLoggerAdapter();
  const accountRepository = makeAccountRepository();
  const bitcoinHistoryRepository = makeBitcoinHistoryRepository();

  const useCase = new GetDiaryBitcoinPriceUseCase(
    logger,
    accountRepository,
    bitcoinHistoryRepository
  );

  return useCase;
};

export { makeGetDiaryBitcoinPriceUseCase };
