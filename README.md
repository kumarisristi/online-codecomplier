# Online Compiler

A full-stack online code compiler/editor supporting multiple languages (Python, Node.js, C++, Java, PHP), built with:

- **Frontend**: Next.js (App Router) + TypeScript + Redux Toolkit + Monaco Editor
- **Backend**: Node.js + Express + TypeScript + MongoDB + Redis (execution queue)
- **Execution**: Isolated per-language Docker containers

## Project Structure

```
online-compiler/
├── frontend/     # Next.js app
├── backend/      # Express API + code execution service
└── docker/       # Per-language execution images
```

## Getting Started

### 1. Prerequisites
- Docker & Docker Compose
- Node.js 18+

### 2. Environment Variables
Copy and edit the env files:
```bash
cp backend/.env.example backend/.env
cp frontend/.env.local.example frontend/.env.local
```

### 3. Build language images
```bash
docker compose build
```

### 4. Run everything
```bash
docker compose up
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### 5. Local dev (without Docker for app servers)
```bash
# Backend
cd backend && npm install && npm run dev

# Frontend
cd frontend && npm install && npm run dev
```

## How code execution works

1. User writes code + optional stdin in the editor and hits **Run**.
2. Frontend calls `POST /api/compiler/run` with `{ language, code, input }`.
3. Backend writes the code to a temp workspace, pushes a job onto the Redis-backed execution queue.
4. The execution worker spins up a short-lived Docker container (`docker/<lang>/Dockerfile`) with CPU/memory/time limits, mounts the workspace, compiles (if needed) and runs the code with the given stdin.
5. stdout/stderr/exit code/duration are captured and returned to the frontend.

## Supported Languages

| Language | Image        | Compile step        |
|----------|--------------|----------------------|
| Python   | `oc-python`  | none (interpreted)   |
| Node.js  | `oc-node`    | none (interpreted)   |
| C++      | `oc-cpp`     | `g++ -O2 -o main`    |
| Java     | `oc-java`    | `javac Main.java`    |
| PHP      | `oc-php`     | none (interpreted)   |

## License
MIT
