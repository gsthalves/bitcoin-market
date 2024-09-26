import { StatusCode } from "@/common/enums";

export type ControllerResponse = {
  data: any;
  statusCode: StatusCode;
};

export abstract class IController {
  abstract execute(input: any): Promise<ControllerResponse>;
}
