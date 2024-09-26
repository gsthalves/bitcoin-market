export class BadRequestError extends Error {
  public readonly errors: string[] | undefined;
  public readonly statusCode: number;
  public readonly internalError: string;

  constructor(message: string, errors?: string[], stack?: string) {
    super(message);

    this.name = "BadRequestError";
    this.errors = errors;
    this.stack = stack;
    this.statusCode = 400;
    this.internalError = "BADREQUESTERROR400";
  }
}
