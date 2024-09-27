import { BitcoinHistoryEntity } from "@/domain/entities";

export abstract class IBitcoinHistoryRepository {
  abstract create(entity: BitcoinHistoryEntity): Promise<BitcoinHistoryEntity>;
  abstract purgeOld(date: Date): Promise<number>;
  abstract findByPeriod(
    startDate: Date,
    endDate: Date
  ): Promise<BitcoinHistoryEntity[] | null>;
}
