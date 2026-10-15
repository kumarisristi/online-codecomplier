import { Request, Response, NextFunction } from "express";
import { runCode } from "../services/compiler/compilerService";
import { Execution } from "../models/Execution";
import { success, failure } from "../utils/response";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { SupportedLanguage } from "../types/compiler";

export async function runController(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { language, code, input } = req.body;

    const normalizedLanguage =
      typeof language === "string" ? language.trim().toLowerCase() : "";

    console.log("REQUEST LANGUAGE:", normalizedLanguage);

    if (!normalizedLanguage || typeof code !== "string") {
      failure(res, "`language` and `code` are required", 400);
      return;
    }

    const result = await runCode({
      language: normalizedLanguage as SupportedLanguage,
      code,
      input: input || "",
    });

    Execution.create({
      user: req.userId || undefined,
      language: normalizedLanguage,
      stdout: result.stdout,
      stderr: result.stderr,
      exitCode: result.exitCode,
      durationMs: result.durationMs,
    }).catch(() => undefined);

    success(res, result);
  } catch (err) {
    next(err);
  }
}

export async function languagesController(
  _req: Request,
  res: Response,
): Promise<void> {
  success(res, {
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
