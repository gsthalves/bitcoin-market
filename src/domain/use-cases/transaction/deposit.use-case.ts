export namespace IDepositUseCase {
  export type ExecuteInput = {
    user: string;
    amount: number;
  };

  export type ExecuteOutput = {
    balance: number;
  };
}

export abstract class IDepositUseCase {
  abstract execute(
    input: IDepositUseCase.ExecuteInput
  ): Promise<IDepositUseCase.ExecuteOutput>;
}
