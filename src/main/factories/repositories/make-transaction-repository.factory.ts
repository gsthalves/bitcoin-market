import { makeLoggerAdapter } from "@/main/factories";
import { ITransactionRepository } from "@/application/repositories";
import { prismaClient } from "@/infrastructure/database";
import { TransactionRepository } from "@/infrastructure/repositories";

const makeTransactionRepository = (): ITransactionRepository => {
  const logger = makeLoggerAdapter();

  const useCase = new TransactionRepository(logger, prismaClient);

  return useCase;
};

export { makeTransactionRepository };
