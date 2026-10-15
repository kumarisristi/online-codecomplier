"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSupportedLanguage = isSupportedLanguage;
exports.runCode = runCode;
const executionService_1 = require("./executionService");
const languageService_1 = require("./languageService");
function isSupportedLanguage(language) {
    try {
        (0, languageService_1.getLanguageConfig)(language);
        return true;
    }
    catch {
        return false;
    }
}
async function runCode(payload) {
    if (!payload.code || !payload.code.trim()) {
        throw new Error("Code cannot be empty");
    }
    if (!isSupportedLanguage(payload.language)) {
        throw new Error(`Unsupported language: ${payload.language}`);
    }
    return (0, executionService_1.executeCode)(payload);
}
//# sourceMappingURL=compilerService.js.map