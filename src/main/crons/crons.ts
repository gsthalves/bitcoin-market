import { ILoggerAdapter } from "@/application/adapters";
import { collectBtcPrice, purgeOldBitcoinHistoryJob } from "@/main/crons";

const startCrons = (logger: ILoggerAdapter) => {
  logger.info("startCrons", "Starting crons.");

  collectBtcPrice(logger);
  purgeOldBitcoinHistoryJob(logger);
};

export { startCrons };
