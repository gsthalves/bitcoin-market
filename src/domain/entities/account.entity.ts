import { Entity, EntityProps } from "@/domain/entities";
import { BusinessValidationError } from "@/domain/errors";

export type AccountEntityProps = {
  name: string;
  email: string;
  password: string;
} & EntityProps;

export class AccountEntity extends Entity<AccountEntityProps> {
  constructor(protected readonly props: AccountEntityProps) {
    super(props);
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  public create(): AccountEntity {
    if (!this.props.id)
      throw new BusinessValidationError(
        "id is mandatory to create an account."
      );

    if (!this.props.name)
      throw new BusinessValidationError(
        "name is mandatory to create an account."
      );

    if (!this.props.email)
      throw new BusinessValidationError(
        "email is mandatory to create an account."
      );

    if (!this.props.password)
      throw new BusinessValidationError(
        "password is mandatory to create an account."
      );

    if (!this.props.createdAt)
      throw new BusinessValidationError(
        "createdAt is mandatory to create an account."
      );

    return this;
  }
}
