"use client";

import Select from "../ui/Select";
import { languageOptions } from "../../utils/languages";
import { SupportedLanguage } from "../../types/compiler";

interface LanguageSelectorProps {
  value: SupportedLanguage;
  onChange: (lang: SupportedLanguage) => void;
}

export default function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value as SupportedLanguage)}
      className="bg-ide-panel border-ide-border text-ide-text focus:border-brand"
    >
      {languageOptions.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </Select>
  );
}
