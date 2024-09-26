export namespace IGetBitcoinPriceService {
  export type ExecuteOutput = {
    high: number;
    low: number;
    vol: number;
    last: number;
    buy: number;
    sell: number;
    open: number;
    pair: number;
    date: Date;
  };
}

export abstract class IGetBitcoinPriceService {
  abstract execute(): Promise<IGetBitcoinPriceService.ExecuteOutput>;
}
