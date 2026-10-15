"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startWorker = startWorker;
const executionQueue_1 = require("./executionQueue");
const executionService_1 = require("../compiler/executionService");
const logger_1 = require("../../utils/logger");
/**
 * Optional background worker for async / queued execution mode.
 * The synchronous HTTP flow in compilerController runs code directly;
 * this worker is provided for a future "submit and poll" execution mode
 * (e.g. batch judging, long-running jobs) and can be started separately
 * with `ts-node src/services/queue/executionWorker.ts`.
 */
async function startWorker() {
    logger_1.logger.info("Execution worker started, waiting for jobs...");
    // eslint-disable-next-line no-constant-condition
    while (true) {
        const job = await (0, executionQueue_1.dequeueExecution)();
        if (!job)
            continue;
        logger_1.logger.info(`Processing job ${job.id}`);
        try {
            const result = await (0, executionService_1.executeCode)(job.payload);
            logger_1.logger.info(`Job ${job.id} finished in ${result.durationMs}ms`);
            // In a full implementation: persist result / publish to a pub-sub
            // channel or websocket so the client can be notified.
        }
        catch (err) {
            logger_1.logger.error(`Job ${job.id} failed`, err);
        }
    }
}
if (require.main === module) {
    startWorker();
}
//# sourceMappingURL=executionWorker.js.map