"use client";

import FileTab from "./FileTab";
import { EditorFile } from "../../types/compiler";

interface FileTabsBarProps {
  files: EditorFile[];
  activeFileId: string;
  onSelect: (id: string) => void;
}

export default function FileTabsBar({ files, activeFileId, onSelect }: FileTabsBarProps) {
  return (
    <div className="flex bg-ide-panel border-b border-ide-border overflow-x-auto">
      {files.map((file) => (
        <FileTab
          key={file.id}
          name={file.name}
          isActive={file.id === activeFileId}
          onSelect={() => onSelect(file.id)}
        />
      ))}
    </div>
  );
}
