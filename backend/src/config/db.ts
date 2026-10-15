import mongoose from "mongoose";
import { env } from "./env";
import { logger } from "../utils/logger";

export async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(env.mongoUri);
    logger.info(`MongoDB connected: ${env.mongoUri}`);
  } catch (err) {
    logger.error("MongoDB connection failed", err);
    process.exit(1);
  }
}
