import jwt from "jsonwebtoken";
import { IJwtAdapter, ILoggerAdapter } from "@/application/adapters";
import { UnexpectedJwtError } from "@/infrastructure/errors";

export class JsonWebTokenAdapter implements IJwtAdapter {
  constructor(private readonly logger: ILoggerAdapter) {}

  sign(input: IJwtAdapter.JwtInput): IJwtAdapter.JwtOutput {
    this.logger.info("IJsonWebTokenAdapter.sign", "Starting sign jwt.");

    try {
      const token = jwt.sign(input.data, input.secret, {
        expiresIn: input.expiresIn,
      });

      this.logger.info("IJsonWebTokenAdapter.sign", "Finished sign jwt.");

      return {
        token: token,
      };
    } catch (error: any) {
      this.logger.error("IJsonWebTokenAdapter.sign", "Error to sign jwt.");

      throw new UnexpectedJwtError("Error to sign jwt.", error.stack);
    }
  }

  verify<T>(input: IJwtAdapter.VerifyInput): IJwtAdapter.VerifyOutput<T> {
    this.logger.info("IJsonWebTokenAdapter.verify", "Starting verify jwt.");

    try {
      const decoded = jwt.verify(input.token, input.secret);

      this.logger.info("IJsonWebTokenAdapter.verify", "Finished verify jwt.");

      return {
        data: decoded as T,
      };
    } catch (error: any) {
      this.logger.error("IJsonWebTokenAdapter.verify", "Error to verify jwt.");

      throw new UnexpectedJwtError("Error to verify jwt.", error.stack);
    }
  }
}
