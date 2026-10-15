import { dequeueExecution } from "./executionQueue";
import { executeCode } from "../compiler/executionService";
import { logger } from "../../utils/logger";

/**
 * Optional background worker for async / queued execution mode.
 * The synchronous HTTP flow in compilerController runs code directly;
 * this worker is provided for a future "submit and poll" execution mode
 * (e.g. batch judging, long-running jobs) and can be started separately
 * with `ts-node src/services/queue/executionWorker.ts`.
 */
async function startWorker(): Promise<void> {
  logger.info("Execution worker started, waiting for jobs...");
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const job = await dequeueExecution();
    if (!job) continue;

    logger.info(`Processing job ${job.id}`);
    try {
      const result = await executeCode(job.payload);
      logger.info(`Job ${job.id} finished in ${result.durationMs}ms`);
      // In a full implementation: persist result / publish to a pub-sub
      // channel or websocket so the client can be notified.
    } catch (err) {
      logger.error(`Job ${job.id} failed`, err);
    }
  }
}

if (require.main === module) {
  startWorker();
}

export { startWorker };
