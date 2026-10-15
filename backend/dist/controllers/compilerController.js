"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runController = runController;
exports.languagesController = languagesController;
const compilerService_1 = require("../services/compiler/compilerService");
const Execution_1 = require("../models/Execution");
const response_1 = require("../utils/response");
async function runController(req, res, next) {
    try {
        const { language, code, input } = req.body;
        const normalizedLanguage = typeof language === "string" ? language.trim().toLowerCase() : "";
        console.log("REQUEST LANGUAGE:", normalizedLanguage);
        if (!normalizedLanguage || typeof code !== "string") {
            (0, response_1.failure)(res, "`language` and `code` are required", 400);
            return;
        }
        const result = await (0, compilerService_1.runCode)({
            language: normalizedLanguage,
            code,
            input: input || "",
        });
        Execution_1.Execution.create({
            user: req.userId || undefined,
            language: normalizedLanguage,
            stdout: result.stdout,
            stderr: result.stderr,
            exitCode: result.exitCode,
            durationMs: result.durationMs,
        }).catch(() => undefined);
        (0, response_1.success)(res, result);
    }
    catch (err) {
        next(err);
    }
}
async function languagesController(_req, res) {
    (0, response_1.success)(res, {
        languages: [
            "python",
            "javascript",
            "nodejs",
            "cpp",
            "c",
            "java",
            "php",
            "csharp",
            "ruby",
            "lua",
            "groovy",
            "kotlin",
            "assembly",
            "plsql",
        ],
    });
}
//# sourceMappingURL=compilerController.js.map