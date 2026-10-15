"use client";

import Editor, { OnMount } from "@monaco-editor/react";
import { useCallback, useEffect, useState } from "react";
import { SupportedLanguage } from "../../types/compiler";
import { getLanguageOption } from "../../utils/languages";

type EditorTheme = "vs-dark" | "light" | "hc-black";

interface CodeEditorProps {
  language: SupportedLanguage;
  code: string;
  onChange: (value: string) => void;
  monacoLanguage?: string;
  onRun?: () => void;
  onSave?: () => void;
}

interface EditorSettings {
  theme: EditorTheme;
  fontSize: number;
  minimap: boolean;
  wordWrap: "on" | "off";
}

const SETTINGS_KEY = "online-compiler-editor-settings";

const DEFAULT_SETTINGS: EditorSettings = {
  theme: "vs-dark",
  fontSize: 14,
  minimap: false,
  wordWrap: "on",
};

export default function CodeEditor({
  language,
  code,
  onChange,
  monacoLanguage,
  onRun,
  onSave,
}: CodeEditorProps) {
  const monacoId = monacoLanguage ?? getLanguageOption(language).monacoId;

  const [settings, setSettings] = useState<EditorSettings>(DEFAULT_SETTINGS);

  const [settingsLoaded, setSettingsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);

        setSettings({
          theme: ["vs-dark", "light", "hc-black"].includes(parsed.theme)
            ? parsed.theme
            : DEFAULT_SETTINGS.theme,
          fontSize:
            Number.isFinite(parsed.fontSize) &&
            parsed.fontSize >= 10 &&
            parsed.fontSize <= 32
              ? parsed.fontSize
              : DEFAULT_SETTINGS.fontSize,
          minimap:
            typeof parsed.minimap === "boolean"
              ? parsed.minimap
              : DEFAULT_SETTINGS.minimap,
          wordWrap: parsed.wordWrap === "off" ? "off" : "on",
        });
      }
    } catch {
      // Invalid saved settings: use defaults.
    } finally {
      setSettingsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!settingsLoaded) return;

    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch {
      // Storage may be unavailable in private browsing.
    }
  }, [settings, settingsLoaded]);

  const updateSetting = useCallback(
    <K extends keyof EditorSettings>(key: K, value: EditorSettings[K]) => {
      setSettings((current) => ({ ...current, [key]: value }));
    },
    [],
  );

  const handleMount: OnMount = (editor, monaco) => {
    editor.addAction({
      id: "online-compiler-run",
      label: "Run Code",
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
      run: () => onRun?.(),
    });

    editor.addAction({
      id: "online-compiler-save",
      label: "Save Code",
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
      run: () => onSave?.(),
    });

    editor.addAction({
      id: "online-compiler-format",
      label: "Format Document",
      keybindings: [
        monaco.KeyMod.Shift | monaco.KeyMod.Alt | monaco.KeyCode.KeyF,
      ],
      run: () => editor.getAction("editor.action.formatDocument")?.run(),
    });
  };

  return (
    <div className="flex h-full min-h-0 flex-col bg-ide-panel">
      <div className="flex flex-wrap items-center gap-3 border-b border-ide-border px-3 py-2">
        <label className="flex items-center gap-2 text-xs text-gray-400">
          Theme
          <select
            value={settings.theme}
            onChange={(event) =>
              updateSetting("theme", event.target.value as EditorTheme)
            }
            className="rounded border border-ide-border bg-ide-panel px-2 py-1 text-sm text-current"
          >
            <option value="vs-dark">Dark</option>
            <option value="light">Light</option>
            <option value="hc-black">High Contrast</option>
          </select>
        </label>

        <label className="flex items-center gap-2 text-xs text-gray-400">
          Font
          <select
            value={settings.fontSize}
            onChange={(event) =>
              updateSetting("fontSize", Number(event.target.value))
            }
            className="rounded border border-ide-border bg-ide-panel px-2 py-1 text-sm text-current"
          >
            {[12, 13, 14, 15, 16, 18, 20, 22, 24, 28, 32].map((size) => (
              <option key={size} value={size}>
                {size}px
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 text-xs text-gray-400">
          <input
            type="checkbox"
            checked={settings.minimap}
            onChange={(event) => updateSetting("minimap", event.target.checked)}
          />
          Minimap
        </label>

        <label className="flex items-center gap-2 text-xs text-gray-400">
          <input
            type="checkbox"
            checked={settings.wordWrap === "on"}
            onChange={(event) =>
              updateSetting("wordWrap", event.target.checked ? "on" : "off")
            }
          />
          Word wrap
        </label>

        <span className="ml-auto text-xs text-gray-500">
          Ctrl+Enter: Run · Ctrl+S: Save
        </span>
      </div>

      <div className="min-h-0 flex-1">
        <Editor
          height="100%"
          language={monacoId}
          value={code}
          theme={settings.theme}
          onChange={(value) => onChange(value ?? "")}
          onMount={handleMount}
          options={{
            fontSize: settings.fontSize,
            minimap: { enabled: settings.minimap },
            wordWrap: settings.wordWrap,
            automaticLayout: true,
            scrollBeyondLastLine: false,
            tabSize: 4,
            insertSpaces: true,
            padding: { top: 12, bottom: 12 },
            fontLigatures: true,
            smoothScrolling: true,
            cursorBlinking: "smooth",
            bracketPairColorization: { enabled: true },
            guides: {
              indentation: true,
              bracketPairs: true,
            },
            renderWhitespace: "selection",
            stickyScroll: { enabled: true },
          }}
        />
      </div>
    </div>
  );
}
