export class GetDiaryVolumeError extends Error {
  private readonly statusCode: number;
  private readonly internalError: string;

  constructor(message: string, stack?: string) {
    super(message);
    this.name = "GetDiaryVolumeError";
    this.stack = stack;
    this.statusCode = 500;
    this.internalError = "GETDIARYVOLUMEERROR500";
  }
}
