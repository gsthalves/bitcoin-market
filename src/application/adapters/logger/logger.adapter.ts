export abstract class ILoggerAdapter {
  abstract info(context: string, message: string, params?: any): void;
  abstract error(context: string, message: string, params?: any): void;
}
