import { CreateAccountController } from "@/presentation/controllers";
import { makeCreateAccountUseCase, makeLoggerAdapter } from "@/main/factories";
import { makeValidatorAdapter } from "@/main/factories";

const makeCreateAccountController = (): CreateAccountController => {
  const logger = makeLoggerAdapter();

  const createAccountUseCase = makeCreateAccountUseCase();
  const validatorAdapter = makeValidatorAdapter();

  const controller = new CreateAccountController(
    logger,
    validatorAdapter,
    createAccountUseCase
  );

  return controller;
};

export { makeCreateAccountController };
