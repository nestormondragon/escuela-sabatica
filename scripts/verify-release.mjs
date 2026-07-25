import { spawn } from "node:child_process";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "..");
const HOST = process.env.RELEASE_HOST || "127.0.0.1";
const PORT = Number(process.env.RELEASE_PORT || 4175);
const BASE_URL = `http://${HOST}:${PORT}`;
const VITE_BIN = path.join(
  PROJECT_ROOT,
  "node_modules",
  "vite",
  "bin",
  "vite.js"
);

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: PROJECT_ROOT,
      env: process.env,
      stdio: "inherit",
      ...options,
    });
    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (code === 0) resolve();
      else {
        reject(
          new Error(
            `${command} ${args.join(" ")} exited with ${
              signal ? `signal ${signal}` : `code ${code}`
            }`
          )
        );
      }
    });
  });
}

async function waitForServer(child) {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`Vite preview exited early with code ${child.exitCode}`);
    }
    try {
      const response = await fetch(`${BASE_URL}/hoy`);
      if (response.ok) return;
    } catch {
      // The preview process is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  throw new Error(`Vite preview did not become ready at ${BASE_URL}`);
}

async function stopServer(child) {
  if (child.exitCode !== null) return;
  child.kill("SIGTERM");
  await Promise.race([
    new Promise((resolve) => child.once("exit", resolve)),
    new Promise((resolve) => setTimeout(resolve, 3_000)),
  ]);
  if (child.exitCode === null) child.kill("SIGKILL");
}

async function main() {
  await run("npm", ["run", "qa"]);

  const preview = spawn(
    process.execPath,
    [
      VITE_BIN,
      "preview",
      "--host",
      HOST,
      "--port",
      String(PORT),
      "--strictPort",
    ],
    {
      cwd: PROJECT_ROOT,
      env: process.env,
      stdio: "inherit",
    }
  );

  try {
    await waitForServer(preview);
    await run(process.execPath, ["scripts/verify-overhaul.mjs"], {
      env: {
        ...process.env,
        BASE_URL,
      },
    });
  } finally {
    await stopServer(preview);
  }
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exitCode = 1;
});
