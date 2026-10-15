"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QUEUE_KEY = void 0;
exports.enqueueExecution = enqueueExecution;
exports.dequeueExecution = dequeueExecution;
const redis_1 = require("../../config/redis");
const logger_1 = require("../../utils/logger");
const QUEUE_KEY = "oc:execution:queue";
exports.QUEUE_KEY = QUEUE_KEY;
/**
 * Lightweight Redis-list-backed job queue. For heavier production loads,
 * swap this for BullMQ (which already speaks to the same Redis instance).
 */
async function enqueueExecution(job) {
    await redis_1.redisConnection.rpush(QUEUE_KEY, JSON.stringify(job));
    logger_1.logger.debug(`Enqueued execution job ${job.id}`);
}
async function dequeueExecution(timeoutSeconds = 5) {
    const result = await redis_1.redisConnection.blpop(QUEUE_KEY, timeoutSeconds);
    if (!result)
        return null;
    const [, raw] = result;
    return JSON.parse(raw);
}
//# sourceMappingURL=executionQueue.js.map