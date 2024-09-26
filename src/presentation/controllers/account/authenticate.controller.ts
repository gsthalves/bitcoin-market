import { z } from "zod";
import { ILoggerAdapter, IValidatorAdapter } from "@/application/adapters";
import { IAuthenticateUseCase } from "@/domain/use-cases";
import { ControllerResponse, IController } from "@/presentation/contracts";
import { StatusCode } from "@/common/enums";
import { BadRequestError } from "@/common/errors";

export class AuthenticateController implements IController {
  constructor(
    private readonly logger: ILoggerAdapter,
    private readonly validator: IValidatorAdapter<z.AnyZodObject>,
    private readonly authenticateUseCase: IAuthenticateUseCase
  ) {}

  private validate(input: any): void {
    this.logger.info(
      "AuthenticateController.validate",
      "Executing authenticate account validation."
    );

    const schema = z.object({
      email: z
        .string({ message: "email is required." })
        .trim()
        .email("Invalid email address."),
      password: z
        .string({ message: "password is required." })
        .min(10, "Password must have min 10 characters."),
    });

    const validation = this.validator.validate({
      schema: schema,
      data: input,
    });

    if (!validation.success)
      throw new BadRequestError("Received data is invalid.", validation.errors);

    this.logger.info(
      "AuthenticateController.execute",
      "Finished authenticate account validation."
    );
  }

  async execute(input: any): Promise<ControllerResponse> {
    this.logger.info(
      "AuthenticateController.execute",
      "Executing authenticate account."
    );

    this.validate(input);

    const response = await this.authenticateUseCase.execute({
      email: input.email,
      password: input.password,
    });

    this.logger.info(
      "AuthenticateController.execute",
      "Finished authenticate account."
    );

    return {
      data: response,
      statusCode: StatusCode.SUCCESS,
    };
  }
}
