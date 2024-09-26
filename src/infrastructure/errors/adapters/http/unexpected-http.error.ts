export class UnexpectedHttpError extends Error {
  private readonly statusCode: number;
  private readonly internalError: string;

  constructor(message: string, stack?: string) {
    super(message);
    this.name = "UnexpectedHttpError";
    this.stack = stack;
    this.statusCode = 500;
    this.internalError = "UNEXPECTEDHTTP500";
  }
}
