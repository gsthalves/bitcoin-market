import { ILoggerAdapter } from "@/application/adapters";
import { IBitcoinHistoryRepository } from "@/application/repositories";
import { BitcoinHistoryEntity } from "@/domain/entities";
import { DatabaseError } from "@/infrastructure/errors";
import { PrismaClient } from "@prisma/client";

export class BitcoinHistoryRepository implements IBitcoinHistoryRepository {
  constructor(
    private readonly logger: ILoggerAdapter,
    private readonly prisma: PrismaClient
  ) {}

  async create(entity: BitcoinHistoryEntity): Promise<BitcoinHistoryEntity> {
    this.logger.info(
      "BitcoinHistoryRepository.create",
      "Executing create bitcoin history."
    );

    try {
      const response = await this.prisma.bitcoinHistory.create({
        data: {
          id: entity.id,
          date: entity.date,
          high: entity.high,
          low: entity.low,
          vol: entity.vol,
          last: entity.last,
          buy: entity.buy,
          sell: entity.sell,
          open: entity.open,
        },
      });

      this.logger.info(
        "BitcoinHistoryRepository.create",
        "Finished create bitcoin history."
      );

      return new BitcoinHistoryEntity({
        id: response.id,
        date: response.date,
        high: response.high.toNumber(),
        low: response.low.toNumber(),
        vol: response.vol.toNumber(),
        last: response.last.toNumber(),
        buy: response.buy.toNumber(),
        sell: response.sell.toNumber(),
        open: response.open.toNumber(),
      });
    } catch (error: any) {
      this.logger.error(
        "BitcoinHistoryRepository.create",
        `Error during create bitcoin history.`,
        {
          error: error.stack,
        }
      );

      throw new DatabaseError("Error to create bitcoin history.");
    }
  }

  async purgeOld(date: Date): Promise<number> {
    this.logger.info(
      "BitcoinHistoryRepository.purgeOld",
      "Executing purge old bitcoin history."
    );

    try {
      const response = await this.prisma.bitcoinHistory.deleteMany({
        where: {
          date: {
            lt: date,
          },
        },
      });

      this.logger.info(
        "BitcoinHistoryRepository.purgeOld",
        "Finished purge old bitcoin history."
      );

      return response.count;
    } catch (error: any) {
      this.logger.error(
        "BitcoinHistoryRepository.purgeOld",
        `Error during purge old bitcoin history.`,
        {
          error: error.stack,
        }
      );

      throw new DatabaseError("Error to purge old bitcoin history.");
    }
  }

  async findByPeriod(
    startDate: Date,
    endDate: Date
  ): Promise<BitcoinHistoryEntity[] | null> {
    this.logger.info(
      "BitcoinHistoryRepository.findByPeriod",
      "Executing get bitcoin history by period."
    );

    try {
      const response = await this.prisma.bitcoinHistory.findMany({
        where: {
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
      });

      this.logger.info(
        "BitcoinHistoryRepository.findByPeriod",
        "Finished get bitcoin history by period."
      );

      if (!response || response.length === 0) return null;

      return response.map(
        (item) =>
          new BitcoinHistoryEntity({
            id: item.id,
            date: item.date,
            high: item.high.toNumber(),
            low: item.low.toNumber(),
            vol: item.vol.toNumber(),
            last: item.last.toNumber(),
            buy: item.buy.toNumber(),
            sell: item.sell.toNumber(),
            open: item.open.toNumber(),
          })
      );
    } catch (error: any) {
      this.logger.error(
        "BitcoinHistoryRepository.findByPeriod",
        `Error during get bitcoin history by period.`,
        {
          error: error.stack,
        }
      );

      throw new DatabaseError("Error to get bitcoin history by period.");
    }
  }
}
