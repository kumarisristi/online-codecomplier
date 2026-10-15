"use client";

interface InputPanelProps {
  value: string;
  onChange: (value: string) => void;
}

export default function InputPanel({ value, onChange }: InputPanelProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 text-xs uppercase tracking-wide text-gray-400 border-b border-ide-border">
        stdin
      </div>
      <textarea
        className="flex-1 bg-ide-bg text-gray-200 text-sm font-mono p-3 resize-none focus:outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Optional input passed to your program..."
      />
    </div>
  );
}
