export namespace IGetDiaryBitcoinPriceUseCase {
  export type ExecuteInput = {
    user: string;
  };

  export type ExecuteOutput = {
    history: {
      date: Date;
      high: number;
      low: number;
      vol: number;
      last: number;
      buy: number;
      sell: number;
      open: number;
    }[];
  };
}

export abstract class IGetDiaryBitcoinPriceUseCase {
  abstract execute(
    input: IGetDiaryBitcoinPriceUseCase.ExecuteInput
  ): Promise<IGetDiaryBitcoinPriceUseCase.ExecuteOutput>;
}
