import cron from "node-cron";
import { ILoggerAdapter } from "@/application/adapters";
import { makeCollectBitcoinPriceController } from "@/main/factories";

const collectBtcPrice = (logger: ILoggerAdapter) => {
  const expression = "*/10 * * * *"; // 10 minutes
  // const expression = "0/10 * * * * * *"; // 10 seconds

  logger.info(
    "collectBtcPrice",
    `Started collect btc price cron executing by expression: ${expression}.`
  );

  cron.schedule(expression, async () => {
    const controller = makeCollectBitcoinPriceController();

    await controller.execute();
  });
};

export { collectBtcPrice };
