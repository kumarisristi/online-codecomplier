"use client";

import { ReactNode } from "react";

interface SidebarProps {
  title: string;
  children: ReactNode;
}

export default function Sidebar({ title, children }: SidebarProps) {
  return (
    <aside className="w-64 shrink-0 bg-white border-r border-line h-full overflow-y-auto">
      <div className="px-4 py-3 text-xs uppercase tracking-wide text-muted border-b border-line">
        {title}
      </div>
      <div className="p-2">{children}</div>
    </aside>
  );
}
