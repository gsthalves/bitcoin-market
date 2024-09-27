import { mock } from "jest-mock-extended";
import { CreateAccountUseCase } from "@/application/use-cases";
import { AccountEntity } from "@/domain/entities";
import { IHashAdapter, ILoggerAdapter } from "@/application/adapters";
import { IAccountRepository } from "@/application/repositories";
import {
  AccountAlreadyExistsError,
  CreateAccountError,
} from "@/application/errors";

describe("create account use case", () => {
  const logger = mock<ILoggerAdapter>();
  const accountRepository = mock<IAccountRepository>();
  const hashAdapter = mock<IHashAdapter>();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("should create an account successfully when valid input is provided", async () => {
    accountRepository.create.mockResolvedValue(
      new AccountEntity({
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password",
        createdAt: new Date(),
      })
    );

    hashAdapter.hash.mockResolvedValue({ hash: "hash" });

    const useCase = new CreateAccountUseCase(
      logger,
      accountRepository,
      hashAdapter
    );

    const input = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    };

    const result = await useCase.execute(input);

    expect(result).toEqual({
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      createdAt: expect.any(String),
    });
    expect(accountRepository.findByEmail).toHaveBeenCalledTimes(1);
    expect(logger.info).toHaveBeenCalledWith(
      "CreateAccountUseCase.execute",
      "Executing create account."
    );
    expect(logger.info).toHaveBeenCalledWith(
      "CreateAccountUseCase.execute",
      "Finished create account."
    );
  });

  it("should throw AccountAlreadyExistsError when email already exists", async () => {
    accountRepository.findByEmail.mockResolvedValue(
      new AccountEntity({
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password",
        createdAt: new Date(),
      })
    );

    const createAccountUseCase = new CreateAccountUseCase(
      logger,
      accountRepository,
      hashAdapter
    );

    const input = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    };

    await expect(createAccountUseCase.execute(input)).rejects.toThrow(
      AccountAlreadyExistsError
    );
    expect(accountRepository.findByEmail).toHaveBeenCalledTimes(1);
    expect(logger.info).toHaveBeenCalledWith(
      "CreateAccountUseCase.execute",
      "Executing create account."
    );
    expect(logger.error).toHaveBeenCalledWith(
      "CreateAccountUseCase.execute",
      "Error to create account."
    );
  });

  it("should throw CreateAccountError when unexpected error occurs", async () => {
    accountRepository.findByEmail.mockRejectedValue(new Error("Error"));

    const createAccountUseCase = new CreateAccountUseCase(
      logger,
      accountRepository,
      hashAdapter
    );

    const input = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    };

    await expect(createAccountUseCase.execute(input)).rejects.toThrow(
      CreateAccountError
    );
    expect(accountRepository.findByEmail).toHaveBeenCalledTimes(1);
    expect(logger.info).toHaveBeenCalledWith(
      "CreateAccountUseCase.execute",
      "Executing create account."
    );
    expect(logger.error).toHaveBeenCalledWith(
      "CreateAccountUseCase.execute",
      "Error to create account."
    );
  });
});
