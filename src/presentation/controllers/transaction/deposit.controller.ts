import { z } from "zod";
import { ILoggerAdapter, IValidatorAdapter } from "@/application/adapters";
import { IDepositUseCase } from "@/domain/use-cases";
import { ControllerResponse, IController } from "@/presentation/contracts";
import { StatusCode } from "@/common/enums";
import { BadRequestError } from "@/common/errors";

export class DepositController implements IController {
  constructor(
    private readonly logger: ILoggerAdapter,
    private readonly validator: IValidatorAdapter<z.AnyZodObject>,
    private readonly depositUseCase: IDepositUseCase
  ) {}

  private validate(input: any): void {
    this.logger.info(
      "DepositController.validate",
      "Executing account deposit validation."
    );

    const schema = z.object({
      amount: z
        .number({
          message: "amount is required.",
        })
        .positive("amount must be greater than zero."),
    });

    const validation = this.validator.validate({
      schema: schema,
      data: input,
    });

    if (!validation.success)
      throw new BadRequestError("Received data is invalid.", validation.errors);

    this.logger.info(
      "DepositController.execute",
      "Finished account deposit validation."
    );
  }

  async execute(input: any): Promise<ControllerResponse> {
    this.logger.info("DepositController.execute", "Executing account deposit.");

    this.validate(input);

    const response = await this.depositUseCase.execute({
      user: input.user,
      amount: parseFloat(input.amount),
    });

    this.logger.info("DepositController.execute", "Finished account deposit.");

    return {
      data: response,
      statusCode: StatusCode.SUCCESS,
    };
  }
}
