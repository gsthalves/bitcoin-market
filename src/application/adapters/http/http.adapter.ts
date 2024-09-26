export namespace IHttpAdapter {
  export type GetInput = {
    url: string;
  };

  export type GetOutput<T> = {
    data: T;
    statusCode: number;
  };
}

export abstract class IHttpAdapter {
  abstract get<T = any>(
    input: IHttpAdapter.GetInput
  ): Promise<IHttpAdapter.GetOutput<T>>;
}
