export namespace ISellUseCase {
  export type ExecuteInput = {
    user: string;
    amount: number;
  };

  export type ExecuteOutput = {
    balance: number;
  };
}

export abstract class ISellUseCase {
  abstract execute(
    input: ISellUseCase.ExecuteInput
  ): Promise<ISellUseCase.ExecuteOutput>;
}
