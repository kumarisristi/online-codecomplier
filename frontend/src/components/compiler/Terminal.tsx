"use client";

import { RunResult } from "../../types/compiler";

interface TerminalProps {
  result: RunResult | null;
}

/**
 * Compact single-line status bar summarizing the last execution,
 * shown below the editor/output split (distinct from the full OutputPanel).
 */
export default function Terminal({ result }: TerminalProps) {
  if (!result) return null;

  const status = result.exitCode === 0 ? "Success" : "Failed";
  const color = result.exitCode === 0 ? "text-green-400" : "text-red-400";

  return (
    <div className="px-4 py-1.5 bg-ide-panel border-t border-ide-border text-xs flex items-center gap-3">
      <span className={color}>{status}</span>
      <span className="text-gray-500">exit code: {result.exitCode ?? "-"}</span>
      <span className="text-gray-500">{result.durationMs}ms</span>
    </div>
  );
}
