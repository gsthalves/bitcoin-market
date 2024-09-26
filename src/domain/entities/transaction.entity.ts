import { AccountEntity, Entity, EntityProps } from "@/domain/entities";
import { BusinessValidationError } from "@/domain/errors";
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

  public deposit(): TransactionEntity {
    if (!this.id)
      throw new BusinessValidationError(
        "id is mandatory to create an Transaction."
      );

    if (!this.accountId)
      throw new BusinessValidationError(
        "accountId is mandatory to create an Transaction."
      );

    // if (!this.email)
    //   throw new BusinessValidationError(
    //     "email is mandatory to create an Transaction."
    //   );

    if (!this.createdAt)
      throw new BusinessValidationError(
        "createdAt is mandatory to create an Transaction."
      );

    return this;
  }
}
