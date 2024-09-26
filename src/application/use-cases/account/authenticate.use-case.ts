import {
  IHashAdapter,
  IJwtAdapter,
  ILoggerAdapter,
} from "@/application/adapters";
import {
  AccountUnauthorizedError,
  AuthenticateError,
} from "@/application/errors";
import { IAccountRepository } from "@/application/repositories";
import { ConfigurationError } from "@/common/errors";
import { IAuthenticateUseCase } from "@/domain/use-cases";

export class AuthenticateUseCase implements IAuthenticateUseCase {
  constructor(
    private readonly logger: ILoggerAdapter,
    private readonly accountRepository: IAccountRepository,
    private readonly hashAdapter: IHashAdapter,
    private readonly jwtAdapter: IJwtAdapter
  ) {}

  async execute(
    input: IAuthenticateUseCase.ExecuteInput
  ): Promise<IAuthenticateUseCase.ExecuteOutput> {
    this.logger.info(
      "AuthenticateUseCase.execute",
      "Executing authenticate account."
    );

    try {
      const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

      if (!JWT_SECRET) {
        this.logger.error(
          "AuthenticateUseCase.execute",
          "JWT_SECRET env var not found."
        );

        throw new ConfigurationError("Internal configuration error.");
      }

      if (!JWT_EXPIRES_IN) {
        this.logger.error(
          "AuthenticateUseCase.execute",
          "JWT_EXPIRES_IN env var not found."
        );

        throw new ConfigurationError("Internal configuration error.");
      }

      const account = await this.accountRepository.findByEmail(input.email);

      if (!account) throw new AccountUnauthorizedError("Unauthorized.");

      const passwordIsValid = await this.hashAdapter.verify({
        hash: account.password,
        text: input.password,
      });

      if (!passwordIsValid) throw new AccountUnauthorizedError("Unauthorized.");

      const token = this.jwtAdapter.sign({
        data: {
          id: account.id,
        },
        expiresIn: parseInt(JWT_EXPIRES_IN),
        secret: JWT_SECRET,
      });

      this.logger.info(
        "AuthenticateUseCase.execute",
        "Finished authenticate account."
      );

      return {
        token: token.token,
      };
    } catch (error) {
      this.logger.error(
        "AuthenticateUseCase.execute",
        "Error to authenticate."
      );

      if (
        error instanceof ConfigurationError ||
        error instanceof AccountUnauthorizedError
      )
        throw error;

      throw new AuthenticateError("Error to authenticate.");
    }
  }
}
