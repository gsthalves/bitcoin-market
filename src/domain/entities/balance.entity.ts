import { AccountEntity, Entity, EntityProps } from "@/domain/entities";
import { CurrencyType } from "@/domain/enums";

export type BalanceEntityProps = {
  account?: AccountEntity;
  accountId: string;
  currency: CurrencyType;
  amount: number;
} & EntityProps;

export class BalanceEntity extends Entity<BalanceEntityProps> {
  constructor(protected readonly props: BalanceEntityProps) {
    super(props);
  }

  get account(): AccountEntity | undefined {
    return this.props.account;
  }

  get accountId(): string {
    return this.props.accountId;
  }

  get currency(): CurrencyType {
    return this.props.currency;
  }

  get amount(): number {
    return this.props.amount;
  }
}
