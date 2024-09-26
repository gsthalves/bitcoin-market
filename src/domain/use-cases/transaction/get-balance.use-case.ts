export namespace IGetBalanceUseCase {
  export type ExecuteInput = {
    user: string;
  };

  export type ExecuteOutput = {
    balance: number;
  };
}

export abstract class IGetBalanceUseCase {
  abstract execute(
    input: IGetBalanceUseCase.ExecuteInput
  ): Promise<IGetBalanceUseCase.ExecuteOutput>;
}
