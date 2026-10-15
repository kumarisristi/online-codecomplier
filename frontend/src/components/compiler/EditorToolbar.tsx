"use client";

import LanguageSelector from "./LanguageSelector";
import RunButton from "./RunButton";
import { SupportedLanguage } from "../../types/compiler";

interface EditorToolbarProps {
  language: SupportedLanguage;
  isRunning: boolean;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onRun: () => void;
}

export default function EditorToolbar({ language, isRunning, onLanguageChange, onRun }: EditorToolbarProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-ide-panel border-b border-ide-border">
      <LanguageSelector value={language} onChange={onLanguageChange} />
      <RunButton isRunning={isRunning} onClick={onRun} />
    </div>
  );
}
