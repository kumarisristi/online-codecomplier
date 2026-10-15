"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withTimeout = withTimeout;
function withTimeout(promise, ms, timeoutMessage = "Operation timed out") {
    let timer;
    const timeout = new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error(timeoutMessage)), ms);
    });
    return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}
//# sourceMappingURL=timeout.js.map