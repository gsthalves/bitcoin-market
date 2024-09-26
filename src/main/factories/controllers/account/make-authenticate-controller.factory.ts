import { AuthenticateController } from "@/presentation/controllers";
import { makeAuthenticateUseCase, makeLoggerAdapter } from "@/main/factories";
import { makeValidatorAdapter } from "@/main/factories";

const makeAuthenticateController = (): AuthenticateController => {
  const logger = makeLoggerAdapter();

  const authenticateUseCase = makeAuthenticateUseCase();
  const validatorAdapter = makeValidatorAdapter();

  const controller = new AuthenticateController(
    logger,
    validatorAdapter,
    authenticateUseCase
  );

  return controller;
};

export { makeAuthenticateController };
