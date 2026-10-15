import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { setLanguage, setCode, setInput, setActiveFile, setFileContent } from "../store/slices/editorSlice";
import { SupportedLanguage } from "../types/compiler";

export function useEditor() {
  const dispatch = useDispatch<AppDispatch>();
  const { language, code, input, files, activeFileId } = useSelector((state: RootState) => state.editor);

  return {
    language,
    code,
    input,
    files,
    activeFileId,
    changeLanguage: (lang: SupportedLanguage) => dispatch(setLanguage(lang)),
    changeCode: (value: string) => dispatch(setCode(value)),
    changeInput: (value: string) => dispatch(setInput(value)),
    changeActiveFile: (id: string) => dispatch(setActiveFile(id)),
    changeFileContent: (id: string, content: string) => dispatch(setFileContent({ id, content })),
  };
}
