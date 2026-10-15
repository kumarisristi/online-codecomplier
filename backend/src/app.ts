import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import compilerRoutes from "./routes/compilerRoutes";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import projectRoutes from "./routes/projectRoutes";
import { notFoundMiddleware, errorMiddleware } from "./middleware/errorMiddleware";
import { apiRateLimiter } from "./middleware/rateLimitMiddleware";

export function createApp(): Application {
  const app = express();

  app.use(cors());
  app.use(express.json({ limit: "1mb" }));
  app.use(morgan("dev"));
  app.use("/api", apiRateLimiter);

  app.get("/health", (_req, res) => res.json({ status: "ok" }));

  app.use("/api/compiler", compilerRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/projects", projectRoutes);

  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  return app;
}
