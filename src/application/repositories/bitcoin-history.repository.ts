import { BitcoinHistoryEntity } from "@/domain/entities";

export abstract class IBitcoinHistoryRepository {
  abstract create(entity: BitcoinHistoryEntity): Promise<BitcoinHistoryEntity>;
  abstract purgeOld(date: Date): Promise<number>;
}
