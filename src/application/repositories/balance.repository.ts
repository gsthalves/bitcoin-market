import { BalanceEntity } from "@/domain/entities";
import { CurrencyType } from "@/domain/enums";

export abstract class IBalanceRepository {
  abstract findByAccount(account: string): Promise<BalanceEntity[] | null>;
  abstract findByAccountAndCurrency(
    accountId: string,
    currency: CurrencyType
  ): Promise<BalanceEntity | null>;
}
