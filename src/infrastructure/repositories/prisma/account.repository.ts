import { ILoggerAdapter } from "@/application/adapters";
import { IAccountRepository } from "@/application/repositories";
import { AccountEntity } from "@/domain/entities";
import { DatabaseError } from "@/infrastructure/errors";
import { PrismaClient } from "@prisma/client";

export class AccountRepository implements IAccountRepository {
  constructor(
    private readonly logger: ILoggerAdapter,
    private readonly prisma: PrismaClient
  ) {}

  async create(entity: AccountEntity): Promise<AccountEntity> {
    this.logger.info("AccountRepository.create", "Executing account creation.");

    try {
      const response = await this.prisma.account.create({
        data: {
          id: entity.id,
          name: entity.name,
          email: entity.email,
          password: entity.password,
          createdAt: entity.createdAt,
        },
      });

      this.logger.info(
        "AccountRepository.create",
        "Finished account creation."
      );

      return new AccountEntity({
        id: response.id,
        name: response.name,
        email: response.email,
        password: "",
        createdAt: response.createdAt,
      });
    } catch (error: any) {
      this.logger.error(
        "AccountRepository.create",
        `Error during account creation.`,
        {
          error: error.stack,
        }
      );

      throw new DatabaseError("Error to create account.");
    }
  }

  async findByEmail(email: string): Promise<AccountEntity | null> {
    this.logger.info(
      "AccountRepository.findByEmail",
      "Executing get account by email."
    );

    try {
      const response = await this.prisma.account.findUnique({
        where: {
          email: email,
        },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      this.logger.info(
        "AccountRepository.findByEmail",
        "Finished get account by email."
      );

      if (!response) return null;

      return new AccountEntity({
        id: response.id,
        name: response.name,
        email: response.email,
        password: response.password,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
      });
    } catch (error: any) {
      this.logger.error(
        "AccountRepository.findByEmail",
        `Error during get account by email.`,
        {
          error: error.stack,
        }
      );

      throw new DatabaseError("Error to get account by email.");
    }
  }

  async findById(id: string): Promise<AccountEntity | null> {
    this.logger.info(
      "AccountRepository.findById",
      "Executing get account by id."
    );

    try {
      const response = await this.prisma.account.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      this.logger.info(
        "AccountRepository.findById",
        "Finished get account by id."
      );

      if (!response) return null;

      return new AccountEntity({
        id: response.id,
        name: response.name,
        email: response.email,
        password: response.password,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
      });
    } catch (error: any) {
      this.logger.error(
        "AccountRepository.findById",
        `Error during get account by id.`,
        {
          error: error.stack,
        }
      );

      throw new DatabaseError("Error to get account by id.");
    }
  }
}
