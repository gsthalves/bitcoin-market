export namespace IPurchaseUseCase {
  export type ExecuteInput = {
    user: string;
    amount: number;
  };

  export type ExecuteOutput = {
    balance: number;
  };
}

export abstract class IPurchaseUseCase {
  abstract execute(
    input: IPurchaseUseCase.ExecuteInput
  ): Promise<IPurchaseUseCase.ExecuteOutput>;
}
