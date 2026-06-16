/**
 * Build original Krescent (Nuxt 2 + vue-babylonjs) into public/play for Vercel.
 * Requires Node 18 — use scripts/build-play.mjs which resolves nvm path on Windows.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const nuxtDir = path.join(root, "legacy", "nuxt");

function resolveNode18() {
  const candidates = [
    process.env.NODE_18_BIN,
    path.join(process.env.APPDATA || "", "nvm", "v18.20.4", "node.exe"),
    path.join(process.env.NVM_HOME || "", "v18.20.4", "node.exe"),
    "node",
  ].filter(Boolean);

  for (const bin of candidates) {
    if (bin === "node" || fs.existsSync(bin)) {
      const r = spawnSync(bin, ["-v"], { encoding: "utf8" });
      if (r.stdout?.startsWith("v18")) return bin;
    }
  }
  console.error("Krescent build requires Node 18. Install via nvm: nvm install 18");
  process.exit(1);
}

const nodeBin = resolveNode18();
const nodeDir = path.dirname(nodeBin);

console.log(`Building Krescent with ${nodeBin}...`);

const pathEnv = `${nodeDir}${path.delimiter}${process.env.PATH || ""}`;
const env = { ...process.env, PATH: pathEnv };

const install = spawnSync("npm", ["install", "--legacy-peer-deps"], {
  cwd: nuxtDir,
  stdio: "inherit",
  shell: true,
  env,
});
if (install.status !== 0) process.exit(install.status ?? 1);

const generate = spawnSync("npx", ["nuxt", "generate"], {
  cwd: nuxtDir,
  stdio: "inherit",
  shell: true,
  env: { ...env, NODE_ENV: "production" },
});
if (generate.status !== 0) process.exit(generate.status ?? 1);

console.log("Krescent original game built to public/play/");
