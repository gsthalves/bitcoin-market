import { TransactionEntity } from "@/domain/entities";
import { CurrencyType, TransactionType } from "@/domain/enums";

export abstract class ITransactionRepository {
  abstract deposit(entity: TransactionEntity): Promise<void>;

  abstract purchase(
    origin: TransactionEntity,
    destination: TransactionEntity
  ): Promise<void>;

  abstract sell(
    origin: TransactionEntity,
    destination: TransactionEntity
  ): Promise<void>;

  abstract findTransactionsByTypeAndCurrency(
    account: string,
    type: TransactionType,
    currency: CurrencyType
  ): Promise<TransactionEntity[] | null>;

  abstract findTransactionsByCurrencyAndPeriod(
    currency: CurrencyType,
    startDate: Date,
    endDate: Date
  ): Promise<TransactionEntity[] | null>;

  abstract findTransactionsByAccountAndPeriod(
    account: string,
    startDate: Date,
    endDate: Date
  ): Promise<TransactionEntity[] | null>;
}
