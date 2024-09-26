import { makeLoggerAdapter } from "@/main/factories";
import { IAccountRepository } from "@/application/repositories";
import { prismaClient } from "@/infrastructure/database";
import { AccountRepository } from "@/infrastructure/repositories";

const makeAccountRepository = (): IAccountRepository => {
  const logger = makeLoggerAdapter();

  const useCase = new AccountRepository(logger, prismaClient);

  return useCase;
};

export { makeAccountRepository };
