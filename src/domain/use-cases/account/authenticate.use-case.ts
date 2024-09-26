export namespace IAuthenticateUseCase {
  export type ExecuteInput = {
    email: string;
    password: string;
  };

  export type ExecuteOutput = {
    token: string;
  };
}

export abstract class IAuthenticateUseCase {
  abstract execute(
    input: IAuthenticateUseCase.ExecuteInput
  ): Promise<IAuthenticateUseCase.ExecuteOutput>;
}
