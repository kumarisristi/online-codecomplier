import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { executeCode, clearResult } from "../store/slices/compilerSlice";
import { RunPayload } from "../types/compiler";

export function useCompiler() {
  const dispatch = useDispatch<AppDispatch>();
  const { result, isRunning, error } = useSelector((state: RootState) => state.compiler);

  return {
    result,
    isRunning,
    error,
    run: (payload: RunPayload) => dispatch(executeCode(payload)),
    reset: () => dispatch(clearResult()),
  };
}
