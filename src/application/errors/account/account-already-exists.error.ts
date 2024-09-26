export class AccountAlreadyExistsError extends Error {
  private readonly statusCode: number;
  private readonly internalError: string;

  constructor(message: string, stack?: string) {
    super(message);
    this.name = "AccountAlreadyExistsError";
    this.stack = stack;
    this.statusCode = 400;
    this.internalError = "ACCOUNTALREADYEXISTS400";
  }
}
