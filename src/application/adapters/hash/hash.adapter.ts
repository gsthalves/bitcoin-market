export namespace IHashAdapter {
  export type HashInput = {
    text: string;
    salt?: string;
  };

  export type HashOutput = {
    hash: string;
  };

  export type VerifyInput = {
    text: string;
    hash: string;
    salt?: string;
  };

  export type VerifyOutput = boolean;
}

export abstract class IHashAdapter {
  abstract hash(
    input: IHashAdapter.HashInput
  ): Promise<IHashAdapter.HashOutput>;

  abstract verify(
    input: IHashAdapter.VerifyInput
  ): Promise<IHashAdapter.VerifyOutput>;
}
