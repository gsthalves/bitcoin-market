import { makeLoggerAdapter } from "@/main/factories";
import { IBalanceRepository } from "@/application/repositories";
import { prismaClient } from "@/infrastructure/database";
import { BalanceRepository } from "@/infrastructure/repositories";

const makeBalanceRepository = (): IBalanceRepository => {
  const logger = makeLoggerAdapter();

  const useCase = new BalanceRepository(logger, prismaClient);

  return useCase;
};

export { makeBalanceRepository };
