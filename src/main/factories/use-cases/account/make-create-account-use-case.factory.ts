import { makeAccountRepository, makeLoggerAdapter } from "@/main/factories";
import { CreateAccountUseCase } from "@/application/use-cases";
import { makeHashAdapter } from "../../adapters/make-hash.factory";

const makeCreateAccountUseCase = (): CreateAccountUseCase => {
  const logger = makeLoggerAdapter();

  const accountRepository = makeAccountRepository();
  const hashAdapter = makeHashAdapter();

  const useCase = new CreateAccountUseCase(
    logger,
    accountRepository,
    hashAdapter
  );

  return useCase;
};

export { makeCreateAccountUseCase };
