import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { runCode } from "../../services/compilerApi";
import { RunPayload, RunResult } from "../../types/compiler";

interface CompilerState {
  result: RunResult | null;
  isRunning: boolean;
  error: string | null;
}

const initialState: CompilerState = {
  result: null,
  isRunning: false,
  error: null,
};

export const executeCode = createAsyncThunk("compiler/execute", async (payload: RunPayload) => {
  return runCode(payload);
});

const compilerSlice = createSlice({
  name: "compiler",
  initialState,
  reducers: {
    clearResult(state) {
      state.result = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(executeCode.pending, (state) => {
        state.isRunning = true;
        state.error = null;
      })
      .addCase(executeCode.fulfilled, (state, action: PayloadAction<RunResult>) => {
        state.isRunning = false;
        state.result = action.payload;
      })
      .addCase(executeCode.rejected, (state, action) => {
        state.isRunning = false;
        state.error = action.error.message || "Execution failed";
      });
  },
});

export const { clearResult } = compilerSlice.actions;
export default compilerSlice.reducer;
