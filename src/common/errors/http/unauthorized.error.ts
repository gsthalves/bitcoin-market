export class UnauthorizedError extends Error {
  public readonly errors: string[] | undefined;
  public readonly statusCode: number;
  private readonly internalError: string;

  constructor(message: string, errors?: string[], stack?: string) {
    super(message);

    this.name = "UnauthorizedError";
    this.errors = errors;
    this.stack = stack;
    this.statusCode = 401;
    this.internalError = "UNAUTHORIZEDERROR401";
  }
}
