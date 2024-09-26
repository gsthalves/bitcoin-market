import { KeyObject, createPrivateKey, createPublicKey } from "node:crypto";

export namespace IJwtAdapter {
  export type JwtInput = {
    data: string | object | Buffer;
    expiresIn: number;
    secret:
      | string
      | Buffer
      | KeyObject
      | { key: string | Buffer; passphrase: string }
      | Parameters<typeof createPrivateKey>[0];
  };

  export type JwtOutput = {
    token: string;
  };

  export type VerifyInput = {
    token: string;
    secret:
      | string
      | Buffer
      | KeyObject
      | { key: string | Buffer; passphrase: string }
      | Parameters<typeof createPublicKey>[0];
  };

  export type VerifyOutput<T> = {
    data: T;
  };
}

export abstract class IJwtAdapter {
  abstract sign(input: IJwtAdapter.JwtInput): IJwtAdapter.JwtOutput;
  abstract verify<T = any>(
    input: IJwtAdapter.VerifyInput
  ): IJwtAdapter.VerifyOutput<T>;
}
