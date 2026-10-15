import { spawn } from "child_process";
import { env } from "../../config/env";

export interface DockerRunOptions {
  image: string;
  workspaceDir: string;
  command: string[];
  input?: string;
  timeoutMs?: number;
  memoryLimit?: string;
  network?: string;
}

export interface DockerRunResult {
  stdout: string;
  stderr: string;
  exitCode: number | null;
  timedOut: boolean;
}

/**
 * Runs a command inside an ephemeral Docker container.
 *
 * The backend itself runs inside Docker and talks to the
 * Docker Desktop daemon through /var/run/docker.sock.
 *
 * Therefore the backend workspace is stored in the shared
 * Docker volume "execution-workspace".
 *
 * That same volume is mounted into the executor container.
 */
export function runInDocker(
  options: DockerRunOptions,
): Promise<DockerRunResult> {
  const {
    image,
    workspaceDir,
    command,
    input = "",
    timeoutMs = env.executionTimeoutMs,
    memoryLimit = env.executionMemoryLimit,
    network = "none",
  } = options;

  // Crystal compiler needs additional memory and compilation time.
  const isCrystal = image === "crystallang/crystal:1.21.0";
  const effectiveMemoryLimit = isCrystal ? "1g" : memoryLimit;
  const effectiveTimeoutMs = isCrystal
    ? Math.max(timeoutMs, 60000)
    : timeoutMs;

  /*
   * workspaceDir example:
   *
   * /tmp/oc-executions/550e8400-e29b-41d4-a716-446655440000
   *
   * We only need the UUID directory name because the
   * complete execution-workspace volume is mounted at /workspace.
   */
  const workspaceId = workspaceDir.split("/").filter(Boolean).pop();

  if (!workspaceId) {
    return Promise.resolve({
      stdout: "",
      stderr: `Invalid workspace directory: ${workspaceDir}`,
      exitCode: 1,
      timedOut: false,
    });
  }

  /*
   * IMPORTANT:
   *
   * docker-compose creates the volume as:
   *
   * <compose-project>_execution-workspace
   *
   * For the current project this is normally:
   *
   * online-compiler_execution-workspace
   *
   * Using the environment variable allows compose to provide
   * the actual volume name.
   */
  const executionVolume =
    process.env.EXECUTION_WORKSPACE_VOLUME ||
    "online-compiler_execution-workspace";

  const args = [
    "run",
    "--rm",

    ...(input ? ["-i"] : []),

    "--network",
    network,

    "--memory",
    effectiveMemoryLimit,

    "--cpus",
    "1",

    "--pids-limit",
    "128",

    "-v",
    `${executionVolume}:/workspace`,

    "-w",
    `/workspace/${workspaceId}`,

    image,
    ...command,
  ];

  return new Promise((resolve) => {
    const child = spawn("docker", args, {
      stdio: ["pipe", "pipe", "pipe"],
      windowsHide: true,
    });

    let stdout = "";
    let stderr = "";
    let timedOut = false;
    let finished = false;

    const killTimer = setTimeout(() => {
      if (finished) return;

      timedOut = true;

      child.kill("SIGKILL");
    }, effectiveTimeoutMs);

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", (err) => {
      if (finished) return;

      finished = true;
      clearTimeout(killTimer);

      resolve({
        stdout,
        stderr: stderr + `\n${err.message}`,
        exitCode: null,
        timedOut,
      });
    });

    child.on("close", (code) => {
      if (finished) return;

      finished = true;
      clearTimeout(killTimer);

      resolve({
        stdout,
        stderr,
        exitCode: code,
        timedOut,
      });
    });

    if (input) {
      child.stdin.write(input);
    }

    child.stdin.end();
  });
}
