"use client";

interface FileExplorerItem {
  id: string;
  name: string;
}

interface FileExplorerProps {
  files: FileExplorerItem[];
  activeFileId: string | null;
  onSelectFile: (id: string) => void;
}

/**
 * Simple project file tree. Currently backs single-file execution;
 * wire this up to `projectApi`/`File` model for multi-file projects.
 */
export default function FileExplorer({ files, activeFileId, onSelectFile }: FileExplorerProps) {
  return (
    <ul className="text-sm">
      {files.map((file) => (
        <li
          key={file.id}
          onClick={() => onSelectFile(file.id)}
          className={`px-3 py-1.5 rounded cursor-pointer ${
            file.id === activeFileId ? "bg-brand text-white" : "text-gray-300 hover:bg-gray-700"
          }`}
        >
          {file.name}
        </li>
      ))}
    </ul>
  );
}
