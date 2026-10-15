import fs from "fs/promises";
import os from "os";
import path from "path";
import { v4 as uuidv4 } from "uuid";

import { RunRequestBody, RunResult } from "../../types/compiler";
import { getLanguageConfig } from "./languageService";
import { runInDocker } from "./dockerService";
import { logger } from "../../utils/logger";
import { executePLSQL } from "./oracleService";

export async function executeCode({
  language,
  code,
  input = "",
}: RunRequestBody): Promise<RunResult> {
  console.log("EXECUTE LANGUAGE:", language);

  const config = getLanguageConfig(language);

  console.log("EXECUTOR CONFIG JSON:", JSON.stringify(config, null, 2));
  if (config.executor === "oracle") {
    console.log("ORACLE EXECUTOR SELECTED");

    const start = Date.now();

    const result = await executePLSQL(code);

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

  const workspaceId = uuidv4();

  const workspaceDir = path.join(os.tmpdir(), "oc-executions", workspaceId);

  await fs.mkdir(workspaceDir, { recursive: true });

  await fs.writeFile(path.join(workspaceDir, config.filename), code, "utf-8");

  const start = Date.now();

  try {
    /*
     * Compilation step
     * Used by C, C++, Java, C#, Assembly, etc.
     */
    if (config.compileCmd) {
      const compileResult = await runInDocker({
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
    const runResult = await runInDocker({
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
  } finally {
    /*
     * Always remove temporary workspace
     */
    fs.rm(workspaceDir, {
      recursive: true,
      force: true,
    }).catch((err) =>
      logger.warn(`Failed to clean workspace ${workspaceDir}`, err),
    );
  }
}
