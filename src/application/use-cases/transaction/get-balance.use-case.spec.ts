import { mock } from "jest-mock-extended";
import { ILoggerAdapter } from "@/application/adapters";
import {
  IAccountRepository,
  IBalanceRepository,
} from "@/application/repositories";
import { GetBalanceUseCase } from "@/application/use-cases";
import { AccountEntity, BalanceEntity } from "@/domain/entities";
import { CurrencyType } from "@/domain/enums";
import { AccountNotExistsError, GetBalanceError } from "@/application/errors";

describe("get balance use case", () => {
  const logger = mock<ILoggerAdapter>();
  const accountRepository = mock<IAccountRepository>();
  const balanceRepository = mock<IBalanceRepository>();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("should return balance when account exists", async () => {
    accountRepository.findById.mockResolvedValue(
      new AccountEntity({
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password",
        createdAt: new Date(),
      })
    );

    balanceRepository.findByAccountAndCurrency.mockResolvedValue(
      new BalanceEntity({
        accountId: "1",
        amount: 100,
        currency: CurrencyType.BRL,
      })
    );

    const getBalanceUseCase = new GetBalanceUseCase(
      logger,
      accountRepository,
      balanceRepository
    );

    const input = { user: "user1" };
    const result = await getBalanceUseCase.execute(input);

    expect(result).toEqual({ balance: 100 });
    expect(logger.info).toHaveBeenCalledWith(
      "GetBalanceUseCase.execute",
      "Started get account balance."
    );
    expect(logger.info).toHaveBeenCalledWith(
      "GetBalanceUseCase.execute",
      "Finished get account balance."
    );
  });

  it("should throw AccountNotExistsError when account does not exist", async () => {
    const getBalanceUseCase = new GetBalanceUseCase(
      logger,
      accountRepository,
      balanceRepository
    );

    const input = { user: "user1" };

    await expect(getBalanceUseCase.execute(input)).rejects.toThrow(
      AccountNotExistsError
    );
    expect(logger.info).toHaveBeenCalledWith(
      "GetBalanceUseCase.execute",
      "Started get account balance."
    );
    expect(logger.error).toHaveBeenCalledWith(
      "GetBalanceUseCase.execute",
      "Error to get account balance."
    );
  });

  it("should throw GetBalanceError when an unexpected error occurs during balance retrieval", async () => {
    accountRepository.findById.mockResolvedValue(
      new AccountEntity({
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password",
        createdAt: new Date(),
      })
    );

    balanceRepository.findByAccountAndCurrency.mockRejectedValue(
      new Error("Error")
    );

    const getBalanceUseCase = new GetBalanceUseCase(
      logger,
      accountRepository,
      balanceRepository
    );

    await expect(
      getBalanceUseCase.execute({ user: "user-id" })
    ).rejects.toThrow(GetBalanceError);

    expect(logger.info).toHaveBeenCalledWith(
      "GetBalanceUseCase.execute",
      "Started get account balance."
    );
    expect(logger.error).toHaveBeenCalledWith(
      "GetBalanceUseCase.execute",
      "Error to get account balance."
    );
  });

  it("should return 0 balance when account exists but has no balance", async () => {
    accountRepository.findById.mockResolvedValue(
      new AccountEntity({
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password",
        createdAt: new Date(),
      })
    );

    const getBalanceUseCase = new GetBalanceUseCase(
      logger,
      accountRepository,
      balanceRepository
    );

    const result = await getBalanceUseCase.execute({ user: "user-id" });

    expect(result).toEqual({ balance: 0 });
    expect(logger.info).toHaveBeenCalledWith(
      "GetBalanceUseCase.execute",
      "Started get account balance."
    );
    expect(logger.info).toHaveBeenCalledWith(
      "GetBalanceUseCase.execute",
      "Finished get account balance."
    );
  });
});
