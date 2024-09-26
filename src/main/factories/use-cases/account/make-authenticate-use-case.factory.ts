import {
  makeAccountRepository,
  makeJwtAdapter,
  makeLoggerAdapter,
} from "@/main/factories";
import { AuthenticateUseCase } from "@/application/use-cases";
import { makeHashAdapter } from "@/main/factories";

const makeAuthenticateUseCase = (): AuthenticateUseCase => {
  const logger = makeLoggerAdapter();

  const accountRepository = makeAccountRepository();
  const hashAdapter = makeHashAdapter();
  const jwtAdapter = makeJwtAdapter();

  const useCase = new AuthenticateUseCase(
    logger,
    accountRepository,
    hashAdapter,
    jwtAdapter
  );

  return useCase;
};

export { makeAuthenticateUseCase };
