import { CurrencyType, TransactionType } from "@prisma/client";

export namespace IGetExtractUseCase {
  export type ExecuteInput = {
    user: string;
    startDate: string | undefined;
    endDate: string | undefined;
  };

  export type ExecuteOutput = {
    btcBalance: number;
    brlBalance: number;
    transactions: {
      id: string;
      currency: CurrencyType;
      type: TransactionType;
      btcPrice: number;
      amount: number;
      date: string;
    }[];
  };
}

export abstract class IGetExtractUseCase {
  abstract execute(
    input: IGetExtractUseCase.ExecuteInput
  ): Promise<IGetExtractUseCase.ExecuteOutput>;
}
