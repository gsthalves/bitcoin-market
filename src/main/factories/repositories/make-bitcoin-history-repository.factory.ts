import { makeLoggerAdapter } from "@/main/factories";
import { IBitcoinHistoryRepository } from "@/application/repositories";
import { prismaClient } from "@/infrastructure/database";
import { BitcoinHistoryRepository } from "@/infrastructure/repositories";

const makeBitcoinHistoryRepository = (): IBitcoinHistoryRepository => {
  const logger = makeLoggerAdapter();

  const useCase = new BitcoinHistoryRepository(logger, prismaClient);

  return useCase;
};

export { makeBitcoinHistoryRepository };
