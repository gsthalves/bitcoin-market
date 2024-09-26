export namespace IGetDiaryVolumeUseCase {
  export type ExecuteInput = {
    user: string;
  };

  export type ExecuteOutput = {
    purchased: number;
    sold: number;
  };
}

export abstract class IGetDiaryVolumeUseCase {
  abstract execute(
    input: IGetDiaryVolumeUseCase.ExecuteInput
  ): Promise<IGetDiaryVolumeUseCase.ExecuteOutput>;
}
