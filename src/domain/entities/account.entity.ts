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
}
