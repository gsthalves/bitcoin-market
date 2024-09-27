import { AccountEntity, Entity, EntityProps } from "@/domain/entities";
import { CurrencyType, TransactionType } from "@/domain/enums";

export type TransactionEntityDepositProps = {
  account?: AccountEntity;
  accountId: string;
  currency: CurrencyType;
  type: TransactionType;
  exchangeRate: number;
  amount: number;
  date: Date;
} & EntityProps;

export class TransactionEntity extends Entity<TransactionEntityDepositProps> {
  constructor(protected props: TransactionEntityDepositProps) {
    super(props);
  }

  public get account(): AccountEntity | undefined {
    return this.props.account;
  }

  public get accountId(): string {
    return this.props.accountId;
  }

  public get currency(): CurrencyType {
    return this.props.currency;
  }

  public get type(): TransactionType {
    return this.props.type;
  }

  public get exchangeRate(): number {
    return this.props.exchangeRate;
  }

  public get amount(): number {
    return this.props.amount;
  }

  public get date(): Date {
    return this.props.date;
  }
}
