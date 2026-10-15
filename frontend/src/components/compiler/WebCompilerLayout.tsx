"use client";

import { ReactNode } from "react";

interface WebCompilerLayoutProps {
  toolbar: ReactNode;
  fileTabs: ReactNode;
  editor: ReactNode;
  preview: ReactNode;
}

export default function WebCompilerLayout({ toolbar, fileTabs, editor, preview }: WebCompilerLayoutProps) {
  return (
    <div className="flex flex-col h-[calc(100vh-56px)]">
      {toolbar}
      <div className="flex flex-1 min-h-0">
        <div className="flex-1 min-w-0 flex flex-col border-r border-ide-border">
          {fileTabs}
          <div className="flex-1 min-h-0">{editor}</div>
        </div>
        <div className="flex-1 min-w-0">{preview}</div>
      </div>
    </div>
  );
}
