export abstract class IPurgeOldBitcoinHistoryUseCase {
  abstract execute(): Promise<void>;
}
