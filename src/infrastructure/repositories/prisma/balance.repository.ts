import { ILoggerAdapter } from "@/application/adapters";
import { IBalanceRepository } from "@/application/repositories";
import { BalanceEntity } from "@/domain/entities";
import { CurrencyType } from "@/domain/enums";
import { DatabaseError } from "@/infrastructure/errors";
import { PrismaClient } from "@prisma/client";

export class BalanceRepository implements IBalanceRepository {
  constructor(
    private readonly logger: ILoggerAdapter,
    private readonly prisma: PrismaClient
  ) {}

  async findByAccount(account: string): Promise<BalanceEntity[] | null> {
    this.logger.info(
      "BalanceRepository.findByAccount",
      "Executing get balance by account."
    );

    try {
      const response = await this.prisma.balance.findMany({
        where: {
          accountId: account,
        },
        select: {
          accountId: true,
          currency: true,
          amount: true,
        },
      });

      this.logger.info(
        "BalanceRepository.findByAccount",
        "Finished get balance by account."
      );

      if (!response) return null;

      return response.map(
        (item) =>
          new BalanceEntity({
            accountId: item.accountId,
            currency: item.currency as CurrencyType,
            amount: item.amount.toNumber(),
          })
      );
    } catch (error: any) {
      this.logger.error(
        "BalanceRepository.findByAccount",
        `Error during get balance by account.`,
        {
          error: error.stack,
        }
      );

      throw new DatabaseError("Error to get balance by account.");
    }
  }

  async findByAccountAndCurrency(
    account: string,
    currency: CurrencyType
  ): Promise<BalanceEntity | null> {
    this.logger.info(
      "BalanceRepository.findByEmail",
      "Executing get balance by account and currency."
    );

    try {
      const response = await this.prisma.balance.findUnique({
        where: {
          accountId: account,
          currency: currency,
        },
        select: {
          accountId: true,
          currency: true,
          amount: true,
        },
      });

      this.logger.info(
        "BalanceRepository.findByEmail",
        "Finished get balance by account and currency."
      );

      if (!response) return null;

      return new BalanceEntity({
        accountId: response.accountId,
        currency: response.currency as CurrencyType,
        amount: response.amount.toNumber(),
      });
    } catch (error: any) {
      this.logger.error(
        "BalanceRepository.findByEmail",
        `Error during get balance by account and currency.`,
        {
          error: error.stack,
        }
      );

      throw new DatabaseError("Error to get balance by account and currency.");
    }
  }
}
