"use client";

import { RunResult } from "../../types/compiler";
import { formatDuration } from "../../utils/formatters";
import Loader from "../common/Loader";

interface OutputPanelProps {
  result: RunResult | null;
  isRunning: boolean;
  error: string | null;
}

export default function OutputPanel({ result, isRunning, error }: OutputPanelProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 text-xs uppercase tracking-wide text-gray-400 border-b border-ide-border flex items-center justify-between">
        <span>Output</span>
        {result && (
          <span className="text-gray-500 normal-case">
            exit {result.exitCode ?? "-"} · {formatDuration(result.durationMs)}
            {result.timedOut && " · timed out"}
          </span>
        )}
      </div>
      <div className="flex-1 bg-ide-bg text-sm font-mono p-3 overflow-auto whitespace-pre-wrap">
        {isRunning && <Loader label="Executing code..." />}
        {!isRunning && error && <span className="text-red-400">{error}</span>}
        {!isRunning && !error && result && (
          <>
            {result.stdout && <span className="text-gray-200">{result.stdout}</span>}
            {result.stderr && <span className="text-red-400">{result.stderr}</span>}
            {!result.stdout && !result.stderr && (
              <span className="text-gray-500">Program finished with no output.</span>
            )}
          </>
        )}
        {!isRunning && !error && !result && (
          <span className="text-gray-500">Run your code to see output here.</span>
        )}
      </div>
    </div>
  );
}
