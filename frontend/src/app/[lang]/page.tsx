"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CompilerLayout from "../../components/compiler/CompilerLayout";
import WebCompilerLayout from "../../components/compiler/WebCompilerLayout";
import EditorToolbar from "../../components/compiler/EditorToolbar";
import CodeEditor from "../../components/compiler/CodeEditor";
import InputPanel from "../../components/compiler/InputPanel";
import OutputPanel from "../../components/compiler/OutputPanel";
import Terminal from "../../components/compiler/Terminal";
import FileTabsBar from "../../components/compiler/FileTabsBar";
import Preview from "../../components/compiler/Preview";
import { useEditor } from "../../hooks/useEditor";
import { useCompiler } from "../../hooks/useCompiler";
import { SupportedLanguage } from "../../types/compiler";
import { languageOptions, isMultiFileLanguage } from "../../utils/languages";

interface CompilerPageProps {
  params: { lang: string };
}

export default function CompilerPage({ params }: CompilerPageProps) {
  const router = useRouter();
  const {
    language,
    code,
    input,
    files,
    activeFileId,
    changeLanguage,
    changeCode,
    changeInput,
    changeActiveFile,
    changeFileContent,
  } = useEditor();
const { result, isRunning, error, run, reset } = useCompiler();
  const [previewRefreshKey, setPreviewRefreshKey] = useState(0);

  // The URL segment is the single source of truth: /python -> python mode,
  // /html -> html mode, etc. Unknown segments (e.g. tiles not yet wired up
  // to the compiler, such as /mysql) fall back to Python.
  useEffect(() => {
    const isValid = languageOptions.some((opt) => opt.value === params.lang);
    const nextLang = (isValid ? params.lang : "python") as SupportedLanguage;
    if (nextLang !== language) {
      changeLanguage(nextLang);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.lang]);

  function handleLanguageChange(lang: SupportedLanguage) {
  if (lang === language) return;
  reset();
  changeLanguage(lang);
  router.push(`/${lang}`, { scroll: false });
}

  const multiFile = isMultiFileLanguage(language);

  function handleRun() {
    if (multiFile) {
      setPreviewRefreshKey((k) => k + 1);
      return;
    }
    run({ language, code, input });
  }

  if (multiFile) {
    const activeFile = files.find((f) => f.id === activeFileId) ?? files[0];

    return (
      <WebCompilerLayout
        toolbar={
          <EditorToolbar
            language={language}
            isRunning={isRunning}
            onLanguageChange={handleLanguageChange}
            onRun={handleRun}
          />
        }
        fileTabs={<FileTabsBar files={files} activeFileId={activeFileId} onSelect={changeActiveFile} />}
        editor={
          activeFile ? (
            <CodeEditor
              language={language}
              monacoLanguage={activeFile.monacoId}
              code={activeFile.content}
              onChange={(value) => changeFileContent(activeFile.id, value)}
            />
          ) : null
        }
        preview={<Preview language={language} files={files} refreshKey={previewRefreshKey} />}
      />
    );
  }

  return (
    <>
      <CompilerLayout
        toolbar={
          <EditorToolbar
            language={language}
            isRunning={isRunning}
            onLanguageChange={handleLanguageChange}
            onRun={handleRun}
          />
        }
        editor={<CodeEditor language={language} code={code} onChange={changeCode} />}
        input={<InputPanel value={input} onChange={changeInput} />}
        output={<OutputPanel result={result} isRunning={isRunning} error={error} />}
      />
      <Terminal result={result} />
    </>
  );
}
