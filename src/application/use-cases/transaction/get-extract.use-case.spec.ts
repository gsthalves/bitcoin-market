import { mock } from "jest-mock-extended";
import { ILoggerAdapter } from "@/application/adapters";
import {
  IAccountRepository,
  IBalanceRepository,
  ITransactionRepository,
} from "@/application/repositories";
import { GetExtractUseCase } from "@/application/use-cases";
import { CurrencyType } from "@/domain/enums";
import { AccountEntity, BalanceEntity } from "@/domain/entities";
import { ConfigurationError } from "@/common/errors";
import { GetBalanceError } from "@/application/errors";

describe("get extract use case", () => {
  const logger = mock<ILoggerAdapter>();
  const accountRepository = mock<IAccountRepository>();
  const transactionRepository = mock<ITransactionRepository>();
  const balanceRepository = mock<IBalanceRepository>();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("should retrieve account extract with valid input dates", async () => {
    accountRepository.findById.mockResolvedValue(
      new AccountEntity({
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password",
        createdAt: new Date(),
      })
    );

    balanceRepository.findByAccount.mockResolvedValue([
      new BalanceEntity({
        accountId: "1",
        currency: CurrencyType.BRL,
        amount: 1000,
      }),
      new BalanceEntity({
        accountId: "1",
        currency: CurrencyType.BTC,
        amount: 0.5,
      }),
    ]);

    process.env.EXTRACT_DEFAULT_INTERVAL = "30";

    const useCase = new GetExtractUseCase(
      logger,
      accountRepository,
      transactionRepository,
      balanceRepository
    );

    const input = {
      user: "1",
      startDate: "2023-01-01",
      endDate: "2023-01-31",
    };
    const result = await useCase.execute(input);

    expect(logger.info).toHaveBeenCalledWith(
      "GetExtractUseCase.execute",
      "Started get account extract."
    );
    expect(accountRepository.findById).toHaveBeenCalledWith("1");
    expect(
      transactionRepository.findTransactionsByAccountAndPeriod
    ).toHaveBeenCalledWith("1", new Date("2023-01-01"), new Date("2023-02-01"));
    expect(balanceRepository.findByAccount).toHaveBeenCalledWith("1");
    expect(result).toEqual({
      brlBalance: 1000,
      btcBalance: 0.5,
      transactions: [],
    });
  });

  it("should throw ConfigurationError when EXTRACT_DEFAULT_INTERVAL is missing", async () => {
    delete process.env.EXTRACT_DEFAULT_INTERVAL;

    const useCase = new GetExtractUseCase(
      logger,
      accountRepository,
      transactionRepository,
      balanceRepository
    );

    const input = { user: "1", startDate: undefined, endDate: undefined };

    await expect(useCase.execute(input)).rejects.toThrow(ConfigurationError);
    expect(logger.error).toHaveBeenCalledWith(
      "GetExtractUseCase.execute",
      "EXTRACT_DEFAULT_INTERVAL env var not found."
    );
  });
});
