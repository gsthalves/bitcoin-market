export namespace IGetPositionUseCase {
  export type ExecuteInput = {
    user: string;
  };

  export type ExecuteOutput = {
    investments: {
      date: string;
      valueInvested: number;
      bitcoinValueInPurchase: number;
      percentageVariation: number;
    }[];
    currentBtcValue: number;
    currentGrossValue: number;
  };
}

export abstract class IGetPositionUseCase {
  abstract execute(
    input: IGetPositionUseCase.ExecuteInput
  ): Promise<IGetPositionUseCase.ExecuteOutput>;
}
