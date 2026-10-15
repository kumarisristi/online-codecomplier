"use client";

import { useMemo } from "react";
import { EditorFile, SupportedLanguage } from "../../types/compiler";
import { buildHtmlPreviewDoc, buildReactPreviewDoc } from "../../utils/editor";

interface PreviewProps {
  language: SupportedLanguage;
  files: EditorFile[];
  /** bump this to force a hard reload of the iframe (e.g. on Run click) */
  refreshKey?: number;
}

export default function Preview({ language, files, refreshKey }: PreviewProps) {
  const srcDoc = useMemo(
    () => (language === "react" ? buildReactPreviewDoc(files) : buildHtmlPreviewDoc(files)),
    [language, files]
  );

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="px-3 py-2 text-xs uppercase tracking-wide text-gray-400 bg-ide-panel border-b border-ide-border">
        Preview
      </div>
      <iframe
        key={refreshKey}
        title="Preview"
        srcDoc={srcDoc}
        sandbox="allow-scripts allow-forms allow-modals allow-popups"
        className="flex-1 w-full bg-white"
      />
    </div>
  );
}
