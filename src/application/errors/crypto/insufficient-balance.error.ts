export class InsufficientBalanceError extends Error {
  private readonly statusCode: number;
  private readonly internalError: string;

  constructor(message: string, stack?: string) {
    super(message);
    this.name = "InsufficientBalanceError";
    this.stack = stack;
    this.statusCode = 400;
    this.internalError = "INSUFFICIENTBALANCEERROR400";
  }
}
