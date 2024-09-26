import {
  makePurchaseUseCase,
  makeLoggerAdapter,
  makeValidatorAdapter,
} from "@/main/factories";
import { PurchaseController } from "@/presentation/controllers";

const makePurchaseController = () => {
  const logger = makeLoggerAdapter();
  const validatorAdapter = makeValidatorAdapter();
  const purchaseUseCase = makePurchaseUseCase();

  const controller = new PurchaseController(
    logger,
    validatorAdapter,
    purchaseUseCase
  );

  return controller;
};

export { makePurchaseController };
