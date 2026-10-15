"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.env = {
    port: Number(process.env.PORT) || 5000,
    mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/online-compiler",
    redisHost: process.env.REDIS_HOST || "localhost",
    redisPort: Number(process.env.REDIS_PORT) || 6379,
    jwtSecret: process.env.JWT_SECRET || "dev_secret_change_me",
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
    nodeEnv: process.env.NODE_ENV || "development",
    executionTimeoutMs: Number(process.env.EXECUTION_TIMEOUT_MS) || 10000,
    executionMemoryLimit: process.env.EXECUTION_MEMORY_LIMIT || "256m",
};
//# sourceMappingURL=env.js.map