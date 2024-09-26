import { z } from "zod";
import { ILoggerAdapter, IValidatorAdapter } from "@/application/adapters";
import { ICreateAccountUseCase } from "@/domain/use-cases";
import { ControllerResponse, IController } from "@/presentation/contracts";
import { StatusCode } from "@/common/enums";
import { BadRequestError } from "@/common/errors";

export class CreateAccountController implements IController {
  constructor(
    private readonly logger: ILoggerAdapter,
    private readonly validator: IValidatorAdapter<z.AnyZodObject>,
    private readonly createAccountUseCase: ICreateAccountUseCase
  ) {}

  private validate(input: any): void {
    this.logger.info(
      "CreateAccountController.validate",
      "Executing create account validation."
    );

    const schema = z.object({
      name: z
        .string({ message: "name is required." })
        .trim()
        .min(1, "name must be greater than 1 characters."),
      email: z
        .string({ message: "email is required." })
        .trim()
        .email("Invalid email address."),
      password: z
        .string({ message: "password is required." })
        .min(10, "password must have min 10 characters."),
    });

    const validation = this.validator.validate({
      schema: schema,
      data: input,
    });

    if (!validation.success)
      throw new BadRequestError("Received data is invalid.", validation.errors);

    this.logger.info(
      "CreateAccountController.execute",
      "Finished create account validation."
    );
  }

  async execute(input: any): Promise<ControllerResponse> {
    this.logger.info(
      "CreateAccountController.execute",
      "Executing create account."
    );

    this.validate(input);

    const response = await this.createAccountUseCase.execute({
      name: input.name,
      email: input.email,
      password: input.password,
    });

    this.logger.info(
      "CreateAccountController.execute",
      "Finished create account."
    );

    return {
      data: response,
      statusCode: StatusCode.CREATED,
    };
  }
}
