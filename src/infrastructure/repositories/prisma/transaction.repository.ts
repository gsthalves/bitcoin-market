import { ILoggerAdapter } from "@/application/adapters";
import { ITransactionRepository } from "@/application/repositories";
import { TransactionEntity } from "@/domain/entities";
import { TransactionType, CurrencyType } from "@/domain/enums";
import { DatabaseError } from "@/infrastructure/errors";
import { PrismaClient } from "@prisma/client";

export class TransactionRepository implements ITransactionRepository {
  constructor(
    private readonly logger: ILoggerAdapter,
    private readonly prisma: PrismaClient
  ) {}

  async deposit(entity: TransactionEntity): Promise<void> {
    this.logger.info(
      "TransactionRepository.deposit",
      "Executing transaction deposit."
    );

    try {
      await this.prisma.$transaction(async (prisma) => {
        await prisma.transaction.create({
          data: {
            id: entity.id,
            accountId: entity.accountId,
            currency: entity.currency,
            type: entity.type,
            exchangeRate: entity.exchangeRate,
            amount: entity.amount,
            date: entity.date,
            createdAt: entity.createdAt,
          },
        });

        await prisma.balance.upsert({
          create: {
            accountId: entity.accountId,
            currency: entity.currency,
            amount: entity.amount,
          },
          update: {
            accountId: entity.accountId,
            currency: entity.currency,
            amount: { increment: entity.amount },
          },
          where: {
            accountId: entity.accountId,
            currency: entity.currency,
          },
        });

        this.logger.info(
          "TransactionRepository.deposit",
          "Finished transaction deposit."
        );
      });
    } catch (error: any) {
      this.logger.error(
        "TransactionRepository.deposit",
        `Error during transaction deposit.`,
        {
          error: error.stack,
        }
      );

      throw new DatabaseError("Error to transaction deposit.");
    }
  }

  async purchase(
    origin: TransactionEntity,
    destination: TransactionEntity
  ): Promise<void> {
    this.logger.info(
      "TransactionRepository.purchase",
      "Executing transaction purchase."
    );

    try {
      await this.prisma.$transaction(async (prisma) => {
        await prisma.transaction.create({
          data: {
            id: origin.id,
            accountId: origin.accountId,
            currency: origin.currency,
            type: origin.type,
            exchangeRate: origin.exchangeRate,
            amount: origin.amount,
            date: origin.date,
            createdAt: origin.createdAt,
          },
        });

        await prisma.transaction.create({
          data: {
            id: destination.id,
            accountId: destination.accountId,
            currency: destination.currency,
            type: destination.type,
            exchangeRate: destination.exchangeRate,
            amount: destination.amount,
            date: destination.date,
            createdAt: destination.createdAt,
          },
        });

        await prisma.balance.upsert({
          create: {
            accountId: origin.accountId,
            currency: origin.currency,
            amount: origin.amount,
          },
          update: {
            accountId: origin.accountId,
            currency: origin.currency,
            amount: { decrement: origin.amount },
          },
          where: {
            accountId: origin.accountId,
            currency: origin.currency,
          },
        });

        await prisma.balance.upsert({
          create: {
            accountId: destination.accountId,
            currency: destination.currency,
            amount: destination.amount,
          },
          update: {
            accountId: destination.accountId,
            currency: destination.currency,
            amount: { increment: destination.amount },
          },
          where: {
            accountId: destination.accountId,
            currency: destination.currency,
          },
        });

        this.logger.info(
          "TransactionRepository.purchase",
          "Finished transaction purchase."
        );
      });
    } catch (error: any) {
      this.logger.error(
        "TransactionRepository.purchase",
        `Error during transaction purchase.`,
        {
          error: error.stack,
        }
      );

      throw new DatabaseError("Error to transaction purchase.");
    }
  }

  async sell(
    origin: TransactionEntity,
    destination: TransactionEntity
  ): Promise<void> {
    this.logger.info(
      "TransactionRepository.sell",
      "Executing transaction sell."
    );

    try {
      await this.prisma.$transaction(async (prisma) => {
        await prisma.transaction.create({
          data: {
            id: origin.id,
            accountId: origin.accountId,
            currency: origin.currency,
            type: origin.type,
            exchangeRate: origin.exchangeRate,
            amount: origin.amount,
            date: origin.date,
            createdAt: origin.createdAt,
          },
        });

        await prisma.transaction.create({
          data: {
            id: destination.id,
            accountId: destination.accountId,
            currency: destination.currency,
            type: destination.type,
            exchangeRate: destination.exchangeRate,
            amount: destination.amount,
            date: destination.date,
            createdAt: destination.createdAt,
          },
        });

        await prisma.balance.upsert({
          create: {
            accountId: origin.accountId,
            currency: origin.currency,
            amount: origin.amount,
          },
          update: {
            accountId: origin.accountId,
            currency: origin.currency,
            amount: { decrement: origin.amount },
          },
          where: {
            accountId: origin.accountId,
            currency: origin.currency,
          },
        });

        await prisma.balance.upsert({
          create: {
            accountId: destination.accountId,
            currency: destination.currency,
            amount: destination.amount,
          },
          update: {
            accountId: destination.accountId,
            currency: destination.currency,
            amount: { increment: destination.amount },
          },
          where: {
            accountId: destination.accountId,
            currency: destination.currency,
          },
        });

        this.logger.info(
          "TransactionRepository.sell",
          "Finished transaction sell."
        );
      });
    } catch (error: any) {
      this.logger.error(
        "TransactionRepository.sell",
        `Error during transaction sell.`,
        {
          error: error.stack,
        }
      );

      throw new DatabaseError("Error to transaction sell.");
    }
  }

  async findTransactionsByTypeAndCurrency(
    account: string,
    type: TransactionType,
    currency: CurrencyType
  ): Promise<TransactionEntity[] | null> {
    this.logger.info(
      "TransactionRepository.findTransactionsByTypeAndCurrency",
      "Executing get transactions by type and currency."
    );

    try {
      const response = await this.prisma.transaction.findMany({
        where: {
          accountId: account,
          currency: currency,
          type: type,
        },
      });

      this.logger.info(
        "TransactionRepository.findTransactionsByTypeAndCurrency",
        "Finished get transactions by type and currency."
      );

      if (!response || response.length === 0) return null;

      return response.map(
        (item) =>
          new TransactionEntity({
            id: item.id,
            accountId: item.accountId,
            type: item.type as TransactionType,
            currency: item.currency as CurrencyType,
            exchangeRate: item.exchangeRate.toNumber(),
            amount: item.amount.toNumber(),
            date: item.date,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          })
      );
    } catch (error: any) {
      this.logger.error(
        "TransactionRepository.findTransactionsByTypeAndCurrency",
        `Error during get transactions by type and currency.`,
        {
          error: error.stack,
        }
      );

      throw new DatabaseError(
        "Error to get transactions by type and currency."
      );
    }
  }

  async findTransactionsByAccountAndPeriod(
    account: string,
    startDate: Date,
    endDate: Date
  ): Promise<TransactionEntity[] | null> {
    this.logger.info(
      "TransactionRepository.findTransactionsByAccountAndPeriod",
      "Executing get transactions by account."
    );

    try {
      const response = await this.prisma.transaction.findMany({
        where: {
          accountId: account,
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
      });

      this.logger.info(
        "TransactionRepository.findTransactionsByAccountAndPeriod",
        "Finished get transactions by account."
      );

      if (!response || response.length === 0) return null;

      return response.map(
        (item) =>
          new TransactionEntity({
            id: item.id,
            accountId: item.accountId,
            type: item.type as TransactionType,
            currency: item.currency as CurrencyType,
            exchangeRate: item.exchangeRate.toNumber(),
            amount: item.amount.toNumber(),
            date: item.date,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          })
      );
    } catch (error: any) {
      this.logger.error(
        "TransactionRepository.findTransactionsByAccountAndPeriod",
        `Error during get transactions by account.`,
        {
          error: error.stack,
        }
      );

      throw new DatabaseError("Error to get transactions by account.");
    }
  }

  async findTransactionsByCurrencyAndPeriod(
    currency: CurrencyType,
    startDate: Date,
    endDate: Date
  ): Promise<TransactionEntity[] | null> {
    this.logger.info(
      "TransactionRepository.findTransactionsByCurrencyAndPeriod",
      "Executing get transactions by currency and period."
    );

    try {
      const response = await this.prisma.transaction.findMany({
        where: {
          currency: currency,
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
      });

      this.logger.info(
        "TransactionRepository.findTransactionsByCurrencyAndPeriod",
        "Finished get transactions by currency and period."
      );

      if (!response || response.length === 0) return null;

      return response.map(
        (item) =>
          new TransactionEntity({
            id: item.id,
            accountId: item.accountId,
            type: item.type as TransactionType,
            currency: item.currency as CurrencyType,
            exchangeRate: item.exchangeRate.toNumber(),
            amount: item.amount.toNumber(),
            date: item.date,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          })
      );
    } catch (error: any) {
      this.logger.error(
        "TransactionRepository.findTransactionsByCurrencyAndPeriod",
        `Error during get transactions by currency and period.`,
        {
          error: error.stack,
        }
      );

      throw new DatabaseError(
        "Error to get transactions by currency and period."
      );
    }
  }
}
