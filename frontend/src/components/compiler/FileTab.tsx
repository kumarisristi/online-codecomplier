"use client";

interface FileTabProps {
  name: string;
  isActive: boolean;
  onSelect: () => void;
  onClose?: () => void;
}

export default function FileTab({ name, isActive, onSelect, onClose }: FileTabProps) {
  return (
    <div
      onClick={onSelect}
      className={`flex items-center gap-2 px-3 py-1.5 text-sm cursor-pointer border-r border-ide-border ${
        isActive ? "bg-ide-bg text-white" : "bg-ide-panel text-gray-400 hover:text-gray-200"
      }`}
    >
      <span>{name}</span>
      {onClose && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="text-gray-500 hover:text-white"
        >
          ×
        </button>
      )}
    </div>
  );
}
