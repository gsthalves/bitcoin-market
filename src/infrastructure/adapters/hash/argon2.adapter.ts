import argon2 from "argon2";
import { IHashAdapter, ILoggerAdapter } from "@/application/adapters";
import { UnexpectedHashError } from "@/infrastructure/errors";

export class Argon2Adapter implements IHashAdapter {
  constructor(private readonly logger: ILoggerAdapter) {}

  async hash(input: IHashAdapter.HashInput): Promise<IHashAdapter.HashOutput> {
    this.logger.info("Argon2Adapter.hash", "Starting create hash.");

    try {
      const hash = await argon2.hash(input.text);

      this.logger.info("Argon2Adapter.hash", "Finished create hash.");

      return {
        hash: hash,
      };
    } catch (error: any) {
      this.logger.error("Argon2Adapter.hash", "Error to create hash.");

      throw new UnexpectedHashError("Error to create hash.", error.stack);
    }
  }

  async verify(input: IHashAdapter.VerifyInput): Promise<boolean> {
    this.logger.info("Argon2Adapter.verify", "Starting verify hash.");

    try {
      const valid = await argon2.verify(input.hash, input.text);

      this.logger.info("Argon2Adapter.verify", "Finished verify hash.");

      if (valid) return true;

      return false;
    } catch (error: any) {
      this.logger.error("Argon2Adapter.verify", "Error to verify hash.");

      throw new UnexpectedHashError("Error to verify hash.", error.stack);
    }
  }
}
