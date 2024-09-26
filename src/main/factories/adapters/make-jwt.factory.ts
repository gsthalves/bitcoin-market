import { IJwtAdapter } from "@/application/adapters";
import { JsonWebTokenAdapter } from "@/infrastructure/adapters";
import { makeLoggerAdapter } from "@/main/factories";

const makeJwtAdapter = (): IJwtAdapter => {
  const logger = makeLoggerAdapter();

  const jwt = new JsonWebTokenAdapter(logger);

  return jwt;
};

export { makeJwtAdapter };
