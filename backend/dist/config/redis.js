"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisConnection = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const env_1 = require("./env");
const logger_1 = require("../utils/logger");
exports.redisConnection = new ioredis_1.default({
    host: env_1.env.redisHost,
    port: env_1.env.redisPort,
    maxRetriesPerRequest: null,
});
exports.redisConnection.on("connect", () => logger_1.logger.info("Redis connected"));
exports.redisConnection.on("error", (err) => logger_1.logger.error("Redis error", err));
//# sourceMappingURL=redis.js.map