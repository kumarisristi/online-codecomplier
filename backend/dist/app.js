"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const compilerRoutes_1 = __importDefault(require("./routes/compilerRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const rateLimitMiddleware_1 = require("./middleware/rateLimitMiddleware");
function createApp() {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json({ limit: "1mb" }));
    app.use((0, morgan_1.default)("dev"));
    app.use("/api", rateLimitMiddleware_1.apiRateLimiter);
    app.get("/health", (_req, res) => res.json({ status: "ok" }));
    app.use("/api/compiler", compilerRoutes_1.default);
    app.use("/api/auth", authRoutes_1.default);
    app.use("/api/users", userRoutes_1.default);
    app.use("/api/projects", projectRoutes_1.default);
    app.use(errorMiddleware_1.notFoundMiddleware);
    app.use(errorMiddleware_1.errorMiddleware);
    return app;
}
//# sourceMappingURL=app.js.map