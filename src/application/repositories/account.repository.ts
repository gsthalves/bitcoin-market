import { AccountEntity } from "@/domain/entities";

export abstract class IAccountRepository {
  abstract create(entity: AccountEntity): Promise<AccountEntity>;
  abstract findByEmail(email: string): Promise<AccountEntity | null>;
  abstract findById(id: string): Promise<AccountEntity | null>;
}
