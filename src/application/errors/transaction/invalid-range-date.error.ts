export class InvalidRangeDateError extends Error {
  private readonly statusCode: number;
  private readonly internalError: string;

  constructor(message: string, stack?: string) {
    super(message);
    this.name = "InvalidRangeDateError";
    this.stack = stack;
    this.statusCode = 400;
    this.internalError = "INVALIDRANGEDATEERROR400";
  }
}
