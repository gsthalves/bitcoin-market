export namespace ICreateAccountUseCase {
  export type ExecuteInput = {
    name: string;
    email: string;
    password: string;
  };

  export type ExecuteOutput = {
    id: string;
    name: string;
    email: string;
    createdAt: string;
  };
}

export abstract class ICreateAccountUseCase {
  abstract execute(
    input: ICreateAccountUseCase.ExecuteInput
  ): Promise<ICreateAccountUseCase.ExecuteOutput>;
}
