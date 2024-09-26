import { z } from "zod";
import { ILoggerAdapter, IValidatorAdapter } from "@/application/adapters";
import { IGetExtractUseCase } from "@/domain/use-cases";
import { ControllerResponse, IController } from "@/presentation/contracts";
import { StatusCode } from "@/common/enums";
import { BadRequestError } from "@/common/errors";

export class GetExtractController implements IController {
  constructor(
    private readonly logger: ILoggerAdapter,
    private readonly validator: IValidatorAdapter<
      z.AnyZodObject | z.ZodEffects<z.AnyZodObject>
    >,
    private readonly getExtractUseCase: IGetExtractUseCase
  ) {}

  private validate(input: any): void {
    this.logger.info(
      "GetExtractController.validate",
      "Executing account get extract validation."
    );

    const schema = z
      .object({
        startDate: z.string().date("startDate is invalid date.").optional(),
        endDate: z.string().date("endDate is invalid date.").optional(),
      })
      .refine((input) => {
        if (input.startDate && !input.endDate) return false;
        if (input.endDate && !input.startDate) return false;

        return true;
      }, "startDate and endDate are required on filter.");

    const validation = this.validator.validate({
      schema: schema,
      data: input,
    });

    if (!validation.success)
      throw new BadRequestError("Received data is invalid.", validation.errors);

    this.logger.info(
      "GetExtractController.execute",
      "Finished account get extract validation."
    );
  }

  async execute(input: any): Promise<ControllerResponse> {
    this.logger.info(
      "GetExtractController.execute",
      "Executing account get extract."
    );

    this.validate(input);

    const response = await this.getExtractUseCase.execute({
      user: input.user,
      startDate: input.startDate,
      endDate: input.endDate,
    });

    this.logger.info(
      "GetExtractController.execute",
      "Finished account get extract."
    );

    return {
      data: response,
      statusCode: StatusCode.SUCCESS,
    };
  }
}
