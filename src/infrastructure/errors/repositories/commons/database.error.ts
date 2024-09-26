export class DatabaseError extends Error {
  private readonly statusCode: number;
  private readonly internalError: string;

  constructor(message: string, stack?: string) {
    super(message);
    this.name = "DatabaseError";
    this.stack = stack;
    this.statusCode = 500;
    this.internalError = "DATABASE500";
  }
}
