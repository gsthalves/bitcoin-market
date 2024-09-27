import cron from "node-cron";
import { ILoggerAdapter } from "@/application/adapters";
import { makeCollectBitcoinPriceController } from "@/main/factories";

const collectBtcPrice = (logger: ILoggerAdapter) => {
  // const expression = "*/10 * * * *";
  const expression = "0/10 * * * * * *";

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
