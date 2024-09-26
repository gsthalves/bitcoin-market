import { z } from "zod";
import { ILoggerAdapter, IValidatorAdapter } from "@/application/adapters";
import { ISellUseCase } from "@/domain/use-cases";
import { ControllerResponse, IController } from "@/presentation/contracts";
import { StatusCode } from "@/common/enums";
import { BadRequestError } from "@/common/errors";

export class SellController implements IController {
  constructor(
    private readonly logger: ILoggerAdapter,
    private readonly validator: IValidatorAdapter<z.AnyZodObject>,
    private readonly sellUseCase: ISellUseCase
  ) {}

  private validate(input: any): void {
    this.logger.info(
      "SellController.validate",
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
      "SellController.execute",
      "Finished account deposit validation."
    );
  }

  async execute(input: any): Promise<ControllerResponse> {
    this.logger.info("SellController.execute", "Executing sell.");

    this.validate(input);

    const response = await this.sellUseCase.execute({
      user: input.user,
      amount: parseFloat(input.amount),
    });

    this.logger.info("SellController.execute", "Finished sell.");

    return {
      data: response,
      statusCode: StatusCode.SUCCESS,
    };
  }
}
