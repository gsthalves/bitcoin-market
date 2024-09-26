export class AccountNotExistsError extends Error {
  private readonly statusCode: number;
  private readonly internalError: string;

  constructor(message: string, stack?: string) {
    super(message);
    this.name = "AccountNotExistsError";
    this.stack = stack;
    this.statusCode = 400;
    this.internalError = "ACCOUNTNOTEXISTS400";
  }
}
