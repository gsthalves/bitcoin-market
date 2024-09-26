import { z } from "zod";
import { ILoggerAdapter, IValidatorAdapter } from "@/application/adapters";

export class ZodAdapter implements IValidatorAdapter<z.AnyZodObject> {
  constructor(private readonly logger: ILoggerAdapter) {}

  validate(
    input: IValidatorAdapter.ValidateInput<z.AnyZodObject>
  ): IValidatorAdapter.ValidateOutput {
    this.logger.info(
      "ZodValidatorAdapter.validate",
      "Starting data validation."
    );

    const { schema, data } = input;

    const result = schema.safeParse(data);

    if (!result.success) {
      this.logger.info("ZodValidatorAdapter.validate", "Data is invalid.");

      return {
        success: false,
        errors: result.error.errors.map((item) => item.message),
      };
    }

    this.logger.info("ZodValidatorAdapter", "Finished data validation.");
    return {
      success: true,
    };
  }
}
