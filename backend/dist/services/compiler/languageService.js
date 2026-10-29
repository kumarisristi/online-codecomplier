"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.languageConfigs = void 0;
exports.getLanguageConfig = getLanguageConfig;
exports.languageConfigs = {
    python: {
        executor: "docker",
        image: "oc-python",
        filename: "main.py",
        runCmd: ["xvfb-run", "-a", "python3", "main.py"],
    },
    javascript: {
        executor: "docker",
        image: "oc-node",
        filename: "main.js",
        runCmd: ["node", "main.js"],
    },
    cpp: {
        executor: "docker",
        image: "oc-cpp",
        filename: "main.cpp",
        compileCmd: ["g++", "-O2", "-o", "main", "main.cpp"],
        runCmd: ["./main"],
    },
    java: {
        executor: "docker",
        image: "oc-java",
        filename: "Main.java",
        compileCmd: ["javac", "Main.java"],
        runCmd: ["java", "Main"],
    },
    dart: {
        executor: "docker",
        image: "oc-dart",
        filename: "main.dart",
        runCmd: ["dart", "main.dart"],
    },
    php: {
        executor: "docker",
        image: "oc-php",
        filename: "main.php",
        runCmd: ["php", "main.php"],
    },
    nodejs: {
        executor: "docker",
        image: "oc-node",
        filename: "main.js",
        runCmd: ["node", "main.js"],
    },
    c: {
        executor: "docker",
        image: "oc-c",
        filename: "main.c",
        compileCmd: ["gcc", "-O2", "-o", "main", "main.c"],
        runCmd: ["./main"],
    },
    csharp: {
        executor: "docker",
        image: "oc-csharp",
        filename: "Program.cs",
        compileCmd: [
            "sh",
            "-c",
            "printf '<Project Sdk=\"Microsoft.NET.Sdk\"><PropertyGroup><OutputType>Exe</OutputType><TargetFramework>net8.0</TargetFramework><ImplicitUsings>enable</ImplicitUsings><Nullable>enable</Nullable></PropertyGroup></Project>' > Program.csproj && dotnet build Program.csproj -c Release -o out",
        ],
        runCmd: ["dotnet", "out/Program.dll"],
    },
    ruby: {
        executor: "docker",
        image: "oc-ruby",
        filename: "main.rb",
        runCmd: ["ruby", "main.rb"],
    },
    lua: {
        executor: "docker",
        image: "oc-lua",
        filename: "main.lua",
        runCmd: ["lua", "main.lua"],
    },
    go: {
        executor: "docker",
        image: "oc-go",
        filename: "main.go",
        runCmd: ["go", "run", "main.go"],
    },
    rust: {
        executor: "docker",
        image: "oc-rust",
        filename: "main.rs",
        runCmd: ["sh", "-c", "rustc main.rs -o main && ./main"],
    },
    typescript: {
        executor: "docker",
        image: "oc-typescript",
        filename: "main.ts",
        runCmd: [
            "sh",
            "-c",
            "tsc main.ts --outDir /tmp/tsout && node /tmp/tsout/main.js",
        ],
    },
    swift: {
        executor: "docker",
        image: "swift:6.4.0-noble",
        filename: "main.swift",
        runCmd: ["sh", "-c", "swiftc main.swift -o main && ./main"],
    },
    scala: {
        executor: "docker",
        image: "oc-scala",
        filename: "Main.scala",
        runCmd: [
            "sh",
            "-c",
            "rm -rf out && mkdir out && scalac Main.scala -d out && scala run --main-class Main -classpath out",
        ],
    },
    r: {
        executor: "docker",
        image: "r-base:4.5.1",
        filename: "main.R",
        runCmd: ["Rscript", "main.R"],
    },
    haskell: {
        executor: "docker",
        image: "haskell:9.12",
        filename: "Main.hs",
        runCmd: ["sh", "-c", "ghc Main.hs -o main && ./main"],
    },
    julia: {
        executor: "docker",
        image: "julia:1.12",
        filename: "main.jl",
        runCmd: ["julia", "main.jl"],
    },
    elixir: {
        executor: "docker",
        image: "elixir:1.19",
        filename: "main.exs",
        runCmd: ["elixir", "main.exs"],
    },
    erlang: {
        executor: "docker",
        image: "erlang:28",
        filename: "main.erl",
        runCmd: [
            "sh",
            "-c",
            "erlc main.erl && erl -noshell -s main main -s init stop",
        ],
    },
    perl: {
        executor: "docker",
        image: "perl:5.42",
        filename: "main.pl",
        runCmd: ["perl", "main.pl"],
    },
    fortran: {
        executor: "docker",
        image: "gcc:15",
        filename: "main.f90",
        runCmd: ["sh", "-c", "gfortran main.f90 -o main && ./main"],
    },
    fsharp: {
        executor: "docker",
        image: "mcr.microsoft.com/dotnet/sdk:10.0",
        filename: "main.fsx",
        runCmd: ["dotnet", "fsi", "main.fsx"],
    },
    ocaml: {
        executor: "docker",
        image: "ocaml/opam:debian-ocaml-5.3",
        filename: "main.ml",
        runCmd: [
            "sh",
            "-c",
            "cp main.ml /tmp/main.ml && cd /tmp && ocamlc -o main main.ml && ./main",
        ],
    },
    nim: {
        executor: "docker",
        image: "nimlang/nim:2.2.4",
        filename: "main.nim",
        runCmd: [
            "sh",
            "-c",
            "cp main.nim /tmp/main.nim && cd /tmp && nim c -r --hints:off main.nim",
        ],
    },
    crystal: {
        executor: "docker",
        image: "crystallang/crystal:1.21.0",
        filename: "main.cr",
        runCmd: [
            "sh",
            "-c",
            "cp main.cr /tmp/main.cr && cd /tmp && crystal run main.cr",
        ],
    },
    groovy: {
        executor: "docker",
        image: "oc-groovy",
        filename: "main.groovy",
        runCmd: ["groovy", "main.groovy"],
    },
    kotlin: {
        executor: "docker",
        image: "oc-kotlin",
        filename: "main.kt",
        runCmd: [
            "sh",
            "-c",
            "kotlinc main.kt -include-runtime -d main.jar && java -jar main.jar",
        ],
    },
    assembly: {
        executor: "docker",
        image: "oc-assembly",
        filename: "main.asm",
        compileCmd: [
            "sh",
            "-c",
            "nasm -f elf64 -o main.o main.asm && ld -o main main.o",
        ],
        runCmd: ["./main"],
    },
    plsql: {
        executor: "oracle",
        filename: "main.sql",
    },
    mysql: {
        executor: "docker",
        image: "mysql:8.0",
        filename: "main.sql",
        runCmd: [
            "sh",
            "-c",
            "mysql --host=compiler-mysql --port=3306 --user=root --password= compiler < main.sql",
        ],
    },
    // postgresql: {
    //   executor: "docker",
    //   image: "postgres:16",
    //   filename: "main.sql",
    //   runCmd: [
    //     "sh",
    //     "-c",
    //     'set -e; PGDATA=$(mktemp -d); chown -R postgres:postgres "$PGDATA"; su postgres -c "initdb -D \'$PGDATA\' --auth=trust"; su postgres -c "pg_ctl -D \'$PGDATA\' -o \'-k /tmp\' -w start"; retval=0; su postgres -c "psql -h /tmp -U postgres -d postgres -f main.sql" || retval=$?; su postgres -c "pg_ctl -D \'$PGDATA\' -m fast -w stop" || true; rm -rf "$PGDATA"; exit $retval',
    //   ],
    // },
    postgresql: {
        executor: "docker",
        image: "postgres:16",
        filename: "main.sql",
        runCmd: [
            "sh",
            "-c",
            'set -e; PGDATA=$(mktemp -d); chown -R postgres:postgres "$PGDATA"; su postgres -c "initdb -D \'$PGDATA\' --auth=trust" >/dev/null 2>&1; su postgres -c "pg_ctl -D \'$PGDATA\' -o \'-k /tmp\' -w start" >/dev/null 2>&1; retval=0; su postgres -c "psql -h /tmp -U postgres -d postgres -f main.sql" || retval=$?; su postgres -c "pg_ctl -D \'$PGDATA\' -m fast -w stop" >/dev/null 2>&1 || true; rm -rf "$PGDATA"; exit $retval',
        ],
    },
    mongodb: {
        executor: "docker",
        image: "mongo:7.0",
        filename: "main.js",
        runCmd: [
            "sh",
            "-c",
            `
set -u

TMPDIR=$(mktemp -d)
MONGO_LOG="/tmp/mongod.log"

cleanup() {
  if [ -n "\${mongod_pid:-}" ]; then
    kill "\$mongod_pid" 2>/dev/null || true
    wait "\$mongod_pid" 2>/dev/null || true
  fi

  rm -rf "\$TMPDIR"
}

trap cleanup EXIT

echo "Starting MongoDB..."

mongod \
  --bind_ip 127.0.0.1 \
  --port 27018 \
  --dbpath "\$TMPDIR" \
  --quiet \
  >"\$MONGO_LOG" 2>&1 &

mongod_pid=\$!

ready=0

for i in \$(seq 1 60); do
  if mongosh \
    --host 127.0.0.1 \
    --port 27018 \
    --quiet \
    --eval 'db.runCommand({ ping: 1 }).ok' \
    admin >/dev/null 2>&1
  then
    ready=1
    break
  fi

  sleep 0.2
done

if [ "\$ready" -ne 1 ]; then
  echo "MongoDB failed to become ready"
  echo "--------------------------------"
  cat "\$MONGO_LOG"
  exit 1
fi

echo "MongoDB started successfully"
echo "Running program..."
echo "--------------------------------"

if [ ! -f main.js ]; then
  echo "ERROR: main.js not found"
  ls -la
  exit 1
fi

mongosh \
  --host 127.0.0.1 \
  --port 27018 \
  --quiet \
  --nodb=false \
  online-compiler \
  --file main.js

retval=\$?

echo "--------------------------------"

if [ "\$retval" -eq 0 ]; then
  echo "Program finished successfully"
else
  echo "Program finished with exit code: \$retval"
fi

exit "\$retval"
`.trim(),
        ],
    },
    tkinter: {
        executor: "docker",
        image: "oc-python",
        filename: "main.py",
        runCmd: ["python3", "main.py"],
    },
    bash: {
        executor: "docker",
        image: "bash:5.2",
        filename: "main.sh",
        runCmd: ["bash", "main.sh"],
    },
    prolog: {
        executor: "docker",
        image: "swipl:9.2.9",
        filename: "main.pl",
        runCmd: ["swipl", "-q", "-s", "main.pl", "-g", "main", "-t", "halt"],
    },
    racket: {
        executor: "docker",
        image: "racket/racket:8.15",
        filename: "main.rkt",
        runCmd: ["racket", "main.rkt"],
    },
    cobol: {
        executor: "docker",
        image: "dagui0/gnucobol:latest",
        filename: "main.cob",
        runCmd: [
            "sh",
            "-c",
            "cobc -x -free -o /tmp/main main.cob && /tmp/main",
        ],
    },
    zig: {
        executor: "docker",
        image: "ziglings/ziglang:latest",
        filename: "main.zig",
        runCmd: ["zig", "run", "main.zig"],
    },
    pascal: {
        executor: "docker",
        image: "oc-pascal:latest",
        filename: "main.pas",
        compileCmd: ["fpc", "-O2", "-omain", "main.pas"],
        runCmd: ["./main"],
    },
    tcl: {
        executor: "docker",
        image: "oc-tcl:latest",
        filename: "main.tcl",
        runCmd: ["tclsh", "main.tcl"],
    },
    coffeescript: {
        executor: "docker",
        image: "oc-coffeescript:latest",
        filename: "main.coffee",
        runCmd: ["coffee", "main.coffee"],
    },
    brainfuck: {
        executor: "docker",
        image: "oc-brainfuck:latest",
        filename: "main.bf",
        runCmd: ["node", "/usr/local/bin/brainfuck.js", "main.bf"],
    }, powershell: {
        executor: "docker",
        image: "mcr.microsoft.com/powershell:latest",
        filename: "main.ps1",
        runCmd: ["pwsh", "-NoLogo", "-NoProfile", "-File", "main.ps1"],
    },
};
function getLanguageConfig(language) {
    const config = exports.languageConfigs[language];
    if (!config) {
        throw new Error(`Unsupported language: ${language}`);
    }
    return config;
}
//# sourceMappingURL=languageService.js.map