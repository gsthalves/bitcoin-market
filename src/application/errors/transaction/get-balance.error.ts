export class GetBalanceError extends Error {
  private readonly statusCode: number;
  private readonly internalError: string;

  constructor(message: string, stack?: string) {
    super(message);
    this.name = "GetBalanceError";
    this.stack = stack;
    this.statusCode = 500;
    this.internalError = "GETBALANCEERROR500";
  }
}
