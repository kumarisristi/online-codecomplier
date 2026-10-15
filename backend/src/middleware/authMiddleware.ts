import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { failure } from "../utils/response";

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    failure(res, "Authentication required", 401);
    return;
  }

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, env.jwtSecret) as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch {
    failure(res, "Invalid or expired token", 401);
  }
}
