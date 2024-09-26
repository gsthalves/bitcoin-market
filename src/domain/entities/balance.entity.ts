import { AccountEntity, Entity, EntityProps } from "@/domain/entities";
import { BusinessValidationError } from "@/domain/errors";
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

  public create(): BalanceEntity {
    if (!this.props.id)
      throw new BusinessValidationError(
        "id is mandatory to create an balance."
      );

    if (!this.props.accountId)
      throw new BusinessValidationError(
        "accountId is mandatory to create an balance."
      );

    if (!this.props.currency)
      throw new BusinessValidationError(
        "currency is mandatory to create an balance."
      );

    if (!this.props.amount)
      throw new BusinessValidationError(
        "amount is mandatory to create an balance."
      );

    return this;
  }
}
