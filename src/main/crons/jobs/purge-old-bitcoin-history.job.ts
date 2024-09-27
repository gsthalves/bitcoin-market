import cron from "node-cron";
import { ILoggerAdapter } from "@/application/adapters";
import { makePurgeOldBitcoinHistoryController } from "@/main/factories";

const purgeOldBitcoinHistoryJob = (logger: ILoggerAdapter) => {
  const expression = "0 0 * * *"; // every day at 00:00
  // const expression = "0/10 * * * * * *"; // 10 seconds

  logger.info(
    "purgeOldBitcoinHistoryJob",
    `Started purge old bitcoin history cron executing by expression: ${expression}.`
  );

  cron.schedule(expression, async () => {
    const controller = makePurgeOldBitcoinHistoryController();

    await controller.execute();
  });
};

export { purgeOldBitcoinHistoryJob };
