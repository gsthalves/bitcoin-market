export namespace IValidatorAdapter {
  export type ValidateInput<T> = {
    schema: T;
    data: any;
  };

  export type ValidateOutput = {
    success: boolean;
    errors?: string[];
  };
}

export abstract class IValidatorAdapter<T> {
  abstract validate(
    input: IValidatorAdapter.ValidateInput<T>
  ): IValidatorAdapter.ValidateOutput;
}
