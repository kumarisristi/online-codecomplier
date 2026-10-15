import api from "./api";
import { RunPayload, RunResult } from "../types/compiler";

export async function runCode(payload: RunPayload): Promise<RunResult> {
  const { data } = await api.post("/compiler/run", payload);
  return data.data as RunResult;
}

export async function fetchSupportedLanguages(): Promise<string[]> {
  const { data } = await api.get("/compiler/languages");
  return data.data.languages as string[];
}
