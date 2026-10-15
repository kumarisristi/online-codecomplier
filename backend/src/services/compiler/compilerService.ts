import { RunRequestBody, RunResult } from "../../types/compiler";
import { executeCode } from "./executionService";
import { getLanguageConfig } from "./languageService";

export function isSupportedLanguage(language: string): boolean {
  try {
    getLanguageConfig(language);
    return true;
  } catch {
    return false;
  }
}

export async function runCode(payload: RunRequestBody): Promise<RunResult> {
  if (!payload.code || !payload.code.trim()) {
    throw new Error("Code cannot be empty");
  }
  if (!isSupportedLanguage(payload.language)) {
    throw new Error(`Unsupported language: ${payload.language}`);
  }
  return executeCode(payload);
}
