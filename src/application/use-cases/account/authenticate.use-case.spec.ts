import { mock } from "jest-mock-extended";
import {
  IHashAdapter,
  IJwtAdapter,
  ILoggerAdapter,
} from "@/application/adapters";
import { IAccountRepository } from "@/application/repositories";
import { AuthenticateUseCase } from "./authenticate.use-case";
import { AccountEntity } from "@/domain/entities";
import { ConfigurationError } from "@/common/errors";
import {
  AccountUnauthorizedError,
  AuthenticateError,
} from "@/application/errors";

describe("authenticate use case", () => {
  const logger = mock<ILoggerAdapter>();
  const accountRepository = mock<IAccountRepository>();
  const hashAdapter = mock<IHashAdapter>();
  const jwtAdapter = mock<IJwtAdapter>();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("should return a token when email and password are valid", async () => {
    accountRepository.findByEmail.mockResolvedValue(
      new AccountEntity({
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password",
        createdAt: new Date(),
      })
    );

    hashAdapter.verify.mockResolvedValue(true);
    jwtAdapter.sign.mockReturnValue({
      token: "jwtToken",
    });

    process.env.JWT_SECRET = "secret";
    process.env.JWT_EXPIRES_IN = "3600";

    const authenticateUseCase = new AuthenticateUseCase(
      logger,
      accountRepository,
      hashAdapter,
      jwtAdapter
    );

    const input = { email: "john.doe@example.com", password: "password" };
    const result = await authenticateUseCase.execute(input);

    expect(result).toEqual({ token: "jwtToken" });
    expect(accountRepository.findByEmail).toHaveBeenCalledTimes(1);
    expect(logger.info).toHaveBeenCalledWith(
      "AuthenticateUseCase.execute",
      "Executing authenticate account."
    );
    expect(logger.info).toHaveBeenCalledWith(
      "AuthenticateUseCase.execute",
      "Finished authenticate account."
    );
  });

  it("should throw ConfigurationError when JWT_SECRET is missing", async () => {
    delete process.env.JWT_SECRET;
    process.env.JWT_EXPIRES_IN = "3600";

    const authenticateUseCase = new AuthenticateUseCase(
      logger,
      accountRepository,
      hashAdapter,
      jwtAdapter
    );

    const input = { email: "test@example.com", password: "password" };

    await expect(authenticateUseCase.execute(input)).rejects.toThrow(
      ConfigurationError
    );
    expect(logger.error).toHaveBeenCalledWith(
      "AuthenticateUseCase.execute",
      "JWT_SECRET env var not found."
    );
  });

  it("should throw ConfigurationError when JWT_EXPIRES_IN is missing", async () => {
    delete process.env.JWT_EXPIRES_IN;
    process.env.JWT_SECRET = "secret";

    const authenticateUseCase = new AuthenticateUseCase(
      logger,
      accountRepository,
      hashAdapter,
      jwtAdapter
    );

    const input = { email: "test@example.com", password: "password" };

    await expect(authenticateUseCase.execute(input)).rejects.toThrow(
      ConfigurationError
    );
    expect(logger.error).toHaveBeenCalledWith(
      "AuthenticateUseCase.execute",
      "JWT_EXPIRES_IN env var not found."
    );
  });

  it("should throw AuthenticateError and log when unexpected error occurs", async () => {
    accountRepository.findByEmail.mockRejectedValue(new Error("Error"));

    process.env.JWT_SECRET = "secret";
    process.env.JWT_EXPIRES_IN = "3600";

    const authenticateUseCase = new AuthenticateUseCase(
      logger,
      accountRepository,
      hashAdapter,
      jwtAdapter
    );

    const input = { email: "test@example.com", password: "password" };

    await expect(authenticateUseCase.execute(input)).rejects.toThrow(
      AuthenticateError
    );
    expect(logger.error).toHaveBeenCalledWith(
      "AuthenticateUseCase.execute",
      "Error to authenticate."
    );
  });

  it("should throw AccountUnauthorizedError when account is not found", async () => {
    process.env.JWT_SECRET = "secret";
    process.env.JWT_EXPIRES_IN = "3600";

    const authenticateUseCase = new AuthenticateUseCase(
      logger,
      accountRepository,
      hashAdapter,
      jwtAdapter
    );

    const input = { email: "test@example.com", password: "password" };

    await expect(authenticateUseCase.execute(input)).rejects.toThrow(
      AccountUnauthorizedError
    );
    expect(accountRepository.findByEmail).toHaveBeenCalledTimes(1);
    expect(logger.info).toHaveBeenCalledWith(
      "AuthenticateUseCase.execute",
      "Executing authenticate account."
    );
    expect(logger.error).toHaveBeenCalledWith(
      "AuthenticateUseCase.execute",
      "Error to authenticate."
    );
  });

  it("should throw AccountUnauthorizedError when password is incorrect", async () => {
    hashAdapter.verify.mockResolvedValue(false);

    process.env.JWT_SECRET = "secret";
    process.env.JWT_EXPIRES_IN = "3600";

    const authenticateUseCase = new AuthenticateUseCase(
      logger,
      accountRepository,
      hashAdapter,
      jwtAdapter
    );

    const input = { email: "test@example.com", password: "incorrectPassword" };

    await expect(authenticateUseCase.execute(input)).rejects.toThrow(
      AccountUnauthorizedError
    );

    expect(logger.info).toHaveBeenCalledWith(
      "AuthenticateUseCase.execute",
      "Executing authenticate account."
    );
    expect(logger.error).toHaveBeenCalledWith(
      "AuthenticateUseCase.execute",
      "Error to authenticate."
    );
  });
});
