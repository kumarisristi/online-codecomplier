"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
const logger_1 = require("../utils/logger");
async function connectDB() {
    try {
        await mongoose_1.default.connect(env_1.env.mongoUri);
        logger_1.logger.info(`MongoDB connected: ${env_1.env.mongoUri}`);
    }
    catch (err) {
        logger_1.logger.error("MongoDB connection failed", err);
        process.exit(1);
    }
}
//# sourceMappingURL=db.js.map