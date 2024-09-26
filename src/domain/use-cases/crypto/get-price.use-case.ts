export namespace IGetPriceUseCase {
  export type ExecuteInput = {
    user: string;
  };

  export type ExecuteOutput = {
    date: string;
    last: number;
    buy: number;
    sell: number;
  };
}

export abstract class IGetPriceUseCase {
  abstract execute(
    input: IGetPriceUseCase.ExecuteInput
  ): Promise<IGetPriceUseCase.ExecuteOutput>;
}
