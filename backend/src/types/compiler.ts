export type SupportedLanguage =
  | "python"
  | "javascript"
  | "nodejs"
  | "cpp"
  | "c"
  | "java"
  | "php"
  | "csharp"
  | "ruby"
  | "lua"
  | "groovy"
  | "assembly"
  | "plsql"
  | "mysql"
  | "mongodb"
  | "postgresql"
  | "tkinter"
  | "kotlin"
  | "dart"
  | "go"
  | "rust"
  | "typescript"
  | "swift"
  | "scala"
  | "r"
  | "haskell"
  | "julia"
  | "elixir"
  | "erlang"
  | "perl"
  | "fortran"
  | "fsharp"
  | "ocaml"
  | "nim"
  | "crystal"
  | "racket"
  | "prolog"
  | "bash"
  | "cobol"
  | "zig"
  | "powershell"
  | "pascal"
  | "tcl"
  | "coffeescript"
  | "brainfuck"
  | "ada"
  | "commonlisp"
  | "dlang"
  | "awk"
  | "scheme"
  | "j"
  | "v"
  | "raku"
  | "verilog"
  | "vhdl"
  | "haxe";

export interface RunRequestBody {
  language: SupportedLanguage;
  code: string;
  input?: string;
}

export interface RunResult {
  stdout: string;
  stderr: string;
  exitCode: number | null;
  durationMs: number;
  timedOut: boolean;
}
