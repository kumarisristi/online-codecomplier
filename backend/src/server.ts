import { createApp } from "./app";
import { env } from "./config/env";
import { connectDB } from "./config/db";
import { logger } from "./utils/logger";
import "./config/redis";

async function bootstrap(): Promise<void> {
  await connectDB();

  const app = createApp();
  app.listen(env.port, () => {
    logger.info(`Backend server listening on port ${env.port} [${env.nodeEnv}]`);
  });
}

bootstrap().catch((err) => {
  logger.error("Failed to start server", err);
  process.exit(1);
});
