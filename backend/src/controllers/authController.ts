import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { env } from "../config/env";
import { success, failure } from "../utils/response";

function signToken(userId: string): string {
  return jwt.sign({ userId }, env.jwtSecret, { expiresIn: env.jwtExpiresIn } as jwt.SignOptions);
}

export async function registerController(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      failure(res, "name, email and password are required", 400);
      return;
    }

    const existing = await User.findOne({ email });
    if (existing) {
      failure(res, "Email already in use", 409);
      return;
    }

    const user = await User.create({ name, email, password });
    const token = signToken(user.id);

    success(res, { token, user: { id: user.id, name: user.name, email: user.email } }, 201);
  } catch (err) {
    next(err);
  }
}

export async function loginController(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      failure(res, "email and password are required", 400);
      return;
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      failure(res, "Invalid credentials", 401);
      return;
    }

    const token = signToken(user.id);
    success(res, { token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    next(err);
  }
}
