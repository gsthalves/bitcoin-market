export class CollectBitcoinPriceError extends Error {
  private readonly statusCode: number;
  private readonly internalError: string;

  constructor(message: string, stack?: string) {
    super(message);
    this.name = "CollectBitcoinPriceError";
    this.stack = stack;
    this.statusCode = 500;
    this.internalError = "COLLECTBITCOINPRICEERROR500";
  }
}
