"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
function log(level, message, meta) {
    const time = new Date().toISOString();
    const line = `[${time}] [${level.toUpperCase()}] ${message}`;
    if (meta !== undefined) {
        // eslint-disable-next-line no-console
        console[level === "debug" ? "log" : level](line, meta);
    }
    else {
        // eslint-disable-next-line no-console
        console[level === "debug" ? "log" : level](line);
    }
}
exports.logger = {
    info: (msg, meta) => log("info", msg, meta),
    warn: (msg, meta) => log("warn", msg, meta),
    error: (msg, meta) => log("error", msg, meta),
    debug: (msg, meta) => log("debug", msg, meta),
};
//# sourceMappingURL=logger.js.map