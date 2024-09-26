import { ILoggerAdapter } from "@/application/adapters";
import { AccountNotExistsError, GetPriceError } from "@/application/errors";
import { IAccountRepository } from "@/application/repositories";
import { IGetBitcoinPriceService } from "@/domain/services";
import { IGetPriceUseCase } from "@/domain/use-cases";

export class GetPriceUseCase implements IGetPriceUseCase {
  constructor(
    private readonly logger: ILoggerAdapter,
    private readonly accountRepository: IAccountRepository,
    private readonly getBitcoinPriceService: IGetBitcoinPriceService
  ) {}

  async execute(
    input: IGetPriceUseCase.ExecuteInput
  ): Promise<IGetPriceUseCase.ExecuteOutput> {
    this.logger.info("GetPriceUseCase.execute", "Started get price.");

    try {
      const account = await this.accountRepository.findById(input.user);

      if (!account) throw new AccountNotExistsError("Account not exists.");

      const bitcoinPrice = await this.getBitcoinPriceService.execute();

      this.logger.info("GetPriceUseCase.execute", "Finished get price.");

      return {
        date: bitcoinPrice.date.toISOString(),
        last: bitcoinPrice.last,
        buy: bitcoinPrice.buy,
        sell: bitcoinPrice.sell,
      };
    } catch (error) {
      this.logger.error("GetPriceUseCase.execute", "Error to get price.");

      if (error instanceof AccountNotExistsError) throw error;

      throw new GetPriceError("Error to get price.");
    }
  }
}
