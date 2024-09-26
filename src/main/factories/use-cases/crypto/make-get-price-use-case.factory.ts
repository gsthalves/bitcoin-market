import { makeAccountRepository, makeLoggerAdapter } from "@/main/factories";
import { GetPriceUseCase } from "@/application/use-cases";
import { IGetPriceUseCase } from "@/domain/use-cases";
import { makeGetBitcoinPriceService } from "@/main/factories";

const makeGetPriceUseCase = (): IGetPriceUseCase => {
  const logger = makeLoggerAdapter();
  const accountRepository = makeAccountRepository();
  const getBitcoinService = makeGetBitcoinPriceService();

  const useCase = new GetPriceUseCase(
    logger,
    accountRepository,
    getBitcoinService
  );

  return useCase;
};

export { makeGetPriceUseCase };
