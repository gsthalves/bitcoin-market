import { IHashAdapter, ILoggerAdapter } from "@/application/adapters";
import {
  AccountAlreadyExistsError,
  CreateAccountError,
} from "@/application/errors";
import { IAccountRepository } from "@/application/repositories";
import { AccountEntity } from "@/domain/entities";
import { ICreateAccountUseCase } from "@/domain/use-cases";

export class CreateAccountUseCase implements ICreateAccountUseCase {
  constructor(
    private readonly logger: ILoggerAdapter,
    private readonly accountRepository: IAccountRepository,
    private readonly hashAdapter: IHashAdapter
  ) {}

  async execute(
    input: ICreateAccountUseCase.ExecuteInput
  ): Promise<ICreateAccountUseCase.ExecuteOutput> {
    this.logger.info(
      "CreateAccountUseCase.execute",
      "Executing create account."
    );

    try {
      const account = await this.accountRepository.findByEmail(input.email);

      if (account)
        throw new AccountAlreadyExistsError("Account already exists.");

      const passwordHash = await this.hashAdapter.hash({
        text: input.password,
      });

      const accountEntity = new AccountEntity({
        name: input.name,
        email: input.email,
        password: passwordHash.hash,
      });

      const response = await this.accountRepository.create(accountEntity);

      this.logger.info(
        "CreateAccountUseCase.execute",
        "Finished create account."
      );

      return {
        id: response.id,
        name: response.name,
        email: response.email,
        createdAt: response.createdAt.toISOString(),
      };
    } catch (error) {
      this.logger.error(
        "CreateAccountUseCase.execute",
        "Error to create account."
      );

      if (error instanceof AccountAlreadyExistsError) throw error;

      throw new CreateAccountError("Error to create account.");
    }
  }
}
