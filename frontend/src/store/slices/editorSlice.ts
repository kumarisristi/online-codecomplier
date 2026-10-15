import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SupportedLanguage, EditorFile } from "../../types/compiler";
import { getLanguageOption, isMultiFileLanguage, getMultiFileBoilerplate } from "../../utils/languages";

interface EditorState {
  language: SupportedLanguage;
  code: string;
  input: string;
  files: EditorFile[];
  activeFileId: string;
}

const initialState: EditorState = {
  language: "python",
  code: getLanguageOption("python").boilerplate,
  input: "",
  files: [],
  activeFileId: "",
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<SupportedLanguage>) {
      state.language = action.payload;
      if (isMultiFileLanguage(action.payload)) {
        const files = getMultiFileBoilerplate(action.payload);
        state.files = files;
        state.activeFileId = files[0].id;
        state.code = "";
      } else {
        state.code = getLanguageOption(action.payload).boilerplate;
        state.files = [];
        state.activeFileId = "";
      }
    },
    setCode(state, action: PayloadAction<string>) {
      state.code = action.payload;
    },
    setInput(state, action: PayloadAction<string>) {
      state.input = action.payload;
    },
    setActiveFile(state, action: PayloadAction<string>) {
      state.activeFileId = action.payload;
    },
    setFileContent(state, action: PayloadAction<{ id: string; content: string }>) {
      state.files = state.files.map(f =>
        f.id === action.payload.id ? { ...f, content: action.payload.content } : f
      );
    },
  },
});

export const { setLanguage, setCode, setInput, setActiveFile, setFileContent } = editorSlice.actions;
export default editorSlice.reducer;
