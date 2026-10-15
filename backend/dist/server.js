"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const env_1 = require("./config/env");
const db_1 = require("./config/db");
const logger_1 = require("./utils/logger");
require("./config/redis");
async function bootstrap() {
    await (0, db_1.connectDB)();
    const app = (0, app_1.createApp)();
    app.listen(env_1.env.port, () => {
        logger_1.logger.info(`Backend server listening on port ${env_1.env.port} [${env_1.env.nodeEnv}]`);
    });
}
bootstrap().catch((err) => {
    logger_1.logger.error("Failed to start server", err);
    process.exit(1);
});
//# sourceMappingURL=server.js.map