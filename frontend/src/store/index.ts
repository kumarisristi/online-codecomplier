import { configureStore } from "@reduxjs/toolkit";
import compilerReducer from "./slices/compilerSlice";
import editorReducer from "./slices/editorSlice";
import authReducer from "./slices/authSlice";
import projectReducer from "./slices/projectSlice";

export const store = configureStore({
  reducer: {
    compiler: compilerReducer,
    editor: editorReducer,
    auth: authReducer,
    projects: projectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
