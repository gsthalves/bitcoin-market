import { IHashAdapter } from "@/application/adapters";
import { Argon2Adapter } from "@/infrastructure/adapters/hash";
import { makeLoggerAdapter } from "@/main/factories";

const makeHashAdapter = (): IHashAdapter => {
  const logger = makeLoggerAdapter();

  const hash = new Argon2Adapter(logger);

  return hash;
};

export { makeHashAdapter };
