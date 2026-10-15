"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeCode = executeCode;
const promises_1 = __importDefault(require("fs/promises"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const languageService_1 = require("./languageService");
const dockerService_1 = require("./dockerService");
const logger_1 = require("../../utils/logger");
const oracleService_1 = require("./oracleService");
async function executeCode({ language, code, input = "", }) {
    console.log("EXECUTE LANGUAGE:", language);
    const config = (0, languageService_1.getLanguageConfig)(language);
    console.log("EXECUTOR CONFIG JSON:", JSON.stringify(config, null, 2));
    if (config.executor === "oracle") {
        console.log("ORACLE EXECUTOR SELECTED");
        const start = Date.now();
        const result = await (0, oracleService_1.executePLSQL)(code);
        return {
            stdout: result.stdout,
            stderr: result.stderr,
            exitCode: result.exitCode,
            durationMs: Date.now() - start,
            timedOut: false,
        };
    }
    // Docker languages must have these values.
    if (!config.image || !config.runCmd) {
        throw new Error(`Docker configuration is incomplete for ${language}`);
    }
    const workspaceId = (0, uuid_1.v4)();
    const workspaceDir = path_1.default.join(os_1.default.tmpdir(), "oc-executions", workspaceId);
    await promises_1.default.mkdir(workspaceDir, { recursive: true });
    await promises_1.default.writeFile(path_1.default.join(workspaceDir, config.filename), code, "utf-8");
    const start = Date.now();
    try {
        /*
         * Compilation step
         * Used by C, C++, Java, C#, Assembly, etc.
         */
        if (config.compileCmd) {
            const compileResult = await (0, dockerService_1.runInDocker)({
                image: config.image,
                workspaceDir,
                command: config.compileCmd,
                // Default is "none".
                // Only languages that explicitly define a network
                // will get network access.
                network: config.network,
            });
            if (compileResult.exitCode !== 0) {
                return {
                    stdout: compileResult.stdout,
                    stderr: compileResult.stderr || "Compilation failed",
                    exitCode: compileResult.exitCode,
                    durationMs: Date.now() - start,
                    timedOut: compileResult.timedOut,
                };
            }
        }
        /*
         * Execution step
         */
        const runResult = await (0, dockerService_1.runInDocker)({
            image: config.image,
            workspaceDir,
            command: config.runCmd,
            input,
            // MySQL will use compiler-network.
            // All other languages remain network-disabled.
            network: config.network,
        });
        return {
            stdout: runResult.stdout,
            stderr: runResult.stderr,
            exitCode: runResult.exitCode,
            durationMs: Date.now() - start,
            timedOut: runResult.timedOut,
        };
    }
    finally {
        /*
         * Always remove temporary workspace
         */
        promises_1.default.rm(workspaceDir, {
            recursive: true,
            force: true,
        }).catch((err) => logger_1.logger.warn(`Failed to clean workspace ${workspaceDir}`, err));
    }
}
//# sourceMappingURL=executionService.js.map