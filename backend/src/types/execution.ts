import { SupportedLanguage } from "./compiler";

export interface LanguageConfig {
  executor: "docker" | "oracle";

  image?: string;
  filename: string;
  compileCmd?: string[];
  runCmd?: string[];
  network?: string;
}

export type LanguageConfigMap = Record<SupportedLanguage, LanguageConfig>;
