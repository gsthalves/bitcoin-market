import { z } from "zod";
import { IValidatorAdapter } from "@/application/adapters";
import { ZodAdapter } from "@/infrastructure/adapters";
import { makeLoggerAdapter } from "@/main/factories";

const makeValidatorAdapter = (): IValidatorAdapter<
  z.AnyZodObject | z.ZodEffects<z.AnyZodObject>
> => {
  const logger = makeLoggerAdapter();

  const validator = new ZodAdapter(logger);

  return validator;
};

export { makeValidatorAdapter };
