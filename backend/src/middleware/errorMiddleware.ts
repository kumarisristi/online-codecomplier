import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";
import { failure } from "../utils/response";

export function notFoundMiddleware(req: Request, res: Response): void {
  failure(res, `Route not found: ${req.method} ${req.originalUrl}`, 404);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction): void {
  logger.error("Unhandled error", err);
  failure(res, err.message || "Internal server error", 500);
}
