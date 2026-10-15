"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

interface CompilerLayoutProps {
  toolbar: ReactNode;
  editor: ReactNode;
  input: ReactNode;
  output: ReactNode;
}

type DragMode = "horizontal" | "vertical" | null;

export default function CompilerLayout({
  toolbar,
  editor,
  input,
  output,
}: CompilerLayoutProps) {
  const [rightWidth, setRightWidth] = useState(38);
  const [inputHeight, setInputHeight] = useState(35);
  const [dragMode, setDragMode] = useState<DragMode>(null);

  const layoutRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dragMode) return;

    const handlePointerMove = (event: PointerEvent) => {
      if (dragMode === "horizontal" && layoutRef.current) {
        const rect = layoutRef.current.getBoundingClientRect();
        const percentage = ((event.clientX - rect.left) / rect.width) * 100;

        // Keep both editor and right panel usable.
        const nextRightWidth = Math.min(60, Math.max(20, 100 - percentage));

        setRightWidth(nextRightWidth);
      }

      if (dragMode === "vertical" && rightPanelRef.current) {
        const rect = rightPanelRef.current.getBoundingClientRect();
        const percentage = ((event.clientY - rect.top) / rect.height) * 100;

        setInputHeight(Math.min(75, Math.max(15, percentage)));
      }
    };

    const handlePointerUp = () => setDragMode(null);

    document.body.style.userSelect = "none";
    document.body.style.cursor =
      dragMode === "horizontal" ? "col-resize" : "row-resize";

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };
  }, [dragMode]);

  return (
    <div className="flex h-[calc(100vh-56px)] min-h-0 flex-col">
      {toolbar}

      <div ref={layoutRef} className="flex min-h-0 flex-1 overflow-hidden">
        {/* Editor panel */}
        <div className="min-h-0 min-w-0 flex-1 overflow-hidden">{editor}</div>

        {/* Draggable left-right divider */}
        <div
          role="separator"
          aria-label="Resize editor and output panels"
          aria-orientation="vertical"
          onPointerDown={(event) => {
            event.preventDefault();
            setDragMode("horizontal");
          }}
          onDoubleClick={() => setRightWidth(38)}
          className={`group relative z-10 w-2 shrink-0 cursor-col-resize touch-none
            border-x border-ide-border bg-ide-panel
            hover:bg-blue-500/20
            ${dragMode === "horizontal" ? "bg-blue-500/30" : ""}`}
          title="Drag to resize editor and output. Double-click to reset."
        >
          <div className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-gray-500/40 group-hover:bg-blue-500" />
        </div>

        {/* Input and output panel */}
        <div
          ref={rightPanelRef}
          className="flex min-h-0 shrink-0 flex-col overflow-hidden"
          style={{ width: `${rightWidth}%` }}
        >
          {/* Input panel */}
          <div
            className="min-h-0 w-full overflow-auto"
            style={{ height: `${inputHeight}%`, flex: "none" }}
          >
            {input}
          </div>

          {/* Draggable input-output divider */}
          <div
            role="separator"
            aria-label="Resize input and output panels"
            aria-orientation="horizontal"
            onPointerDown={(event) => {
              event.preventDefault();
              setDragMode("vertical");
            }}
            onDoubleClick={() => setInputHeight(35)}
            className={`group relative z-10 h-2 shrink-0 cursor-row-resize touch-none
              border-y border-ide-border bg-ide-panel
              hover:bg-blue-500/20
              ${dragMode === "vertical" ? "bg-blue-500/30" : ""}`}
            title="Drag to resize input and output. Double-click to reset."
          >
            <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-gray-500/40 group-hover:bg-blue-500" />
          </div>

          {/* Output panel */}
          <div className="min-h-0 min-w-0 flex-1 overflow-auto">{output}</div>
        </div>
      </div>
    </div>
  );
}
