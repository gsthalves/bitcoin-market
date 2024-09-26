import { IHttpAdapter, ILoggerAdapter } from "@/application/adapters";
import { GetPriceError } from "@/application/errors";
import { ConfigurationError } from "@/common/errors";
import { IGetBitcoinPriceService } from "@/domain/services";

export class GetBitcoinPriceService implements IGetBitcoinPriceService {
  constructor(
    private readonly logger: ILoggerAdapter,
    private readonly http: IHttpAdapter
  ) {}

  async execute(): Promise<IGetBitcoinPriceService.ExecuteOutput> {
    this.logger.info("GetBitcoinPriceService.getPrice", "Started get price.");

    try {
      const { BITCOIN_GET_PRICE_URL } = process.env;

      if (!BITCOIN_GET_PRICE_URL) {
        this.logger.error(
          "GetBitcoinPriceService.getPrice",
          "BITCOIN_GET_PRICE_URL env var not found."
        );

        throw new ConfigurationError("Internal configuration error.");
      }

      const response = await this.http.get<{
        ticker: {
          high: string;
          low: string;
          vol: string;
          last: string;
          buy: string;
          sell: string;
          open: string;
          pair: string;
          date: number;
        };
      }>({
        url: BITCOIN_GET_PRICE_URL,
      });

      const {
        data: {
          ticker: { high, low, vol, last, buy, sell, open, pair, date },
        },
      } = response;

      this.logger.info(
        "GetBitcoinPriceService.getPrice",
        "Finished get price."
      );

      return {
        high: parseFloat(high),
        low: parseFloat(low),
        vol: parseFloat(vol),
        last: parseFloat(last),
        buy: parseFloat(buy),
        sell: parseFloat(sell),
        open: parseFloat(open),
        pair: parseFloat(pair),
        date: new Date(date * 1000),
      };
    } catch (error: any) {
      this.logger.error(
        "GetBitcoinPriceService.getPrice",
        "Error to get price."
      );

      if (error instanceof ConfigurationError) throw error;

      throw new GetPriceError("Error to get price.", error.stack);
    }
  }
}
