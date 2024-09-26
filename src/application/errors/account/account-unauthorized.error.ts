export class AccountUnauthorizedError extends Error {
  private readonly statusCode: number;
  private readonly internalError: string;

  constructor(message: string, stack?: string) {
    super(message);
    this.name = "AccountUnauthorizedError";
    this.stack = stack;
    this.statusCode = 401;
    this.internalError = "ACCOUNTUNAUTHORIZEDERROR401";
  }
}
