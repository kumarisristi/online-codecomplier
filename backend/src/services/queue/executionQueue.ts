import { redisConnection } from "../../config/redis";
import { RunRequestBody } from "../../types/compiler";
import { logger } from "../../utils/logger";

const QUEUE_KEY = "oc:execution:queue";

export interface QueuedJob {
  id: string;
  payload: RunRequestBody;
  enqueuedAt: number;
}

/**
 * Lightweight Redis-list-backed job queue. For heavier production loads,
 * swap this for BullMQ (which already speaks to the same Redis instance).
 */
export async function enqueueExecution(job: QueuedJob): Promise<void> {
  await redisConnection.rpush(QUEUE_KEY, JSON.stringify(job));
  logger.debug(`Enqueued execution job ${job.id}`);
}

export async function dequeueExecution(timeoutSeconds = 5): Promise<QueuedJob | null> {
  const result = await redisConnection.blpop(QUEUE_KEY, timeoutSeconds);
  if (!result) return null;
  const [, raw] = result;
  return JSON.parse(raw) as QueuedJob;
}

export { QUEUE_KEY };
