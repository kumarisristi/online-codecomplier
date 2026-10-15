"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundMiddleware = notFoundMiddleware;
exports.errorMiddleware = errorMiddleware;
const logger_1 = require("../utils/logger");
const response_1 = require("../utils/response");
function notFoundMiddleware(req, res) {
    (0, response_1.failure)(res, `Route not found: ${req.method} ${req.originalUrl}`, 404);
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errorMiddleware(err, req, res, next) {
    logger_1.logger.error("Unhandled error", err);
    (0, response_1.failure)(res, err.message || "Internal server error", 500);
}
//# sourceMappingURL=errorMiddleware.js.map