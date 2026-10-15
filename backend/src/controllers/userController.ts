import { Response, NextFunction } from "express";
import { User } from "../models/User";
import { success, failure } from "../utils/response";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

export async function meController(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      failure(res, "User not found", 404);
      return;
    }
    success(res, { id: user.id, name: user.name, email: user.email });
  } catch (err) {
    next(err);
  }
}
