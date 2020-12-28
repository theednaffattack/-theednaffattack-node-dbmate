import { spawnSync } from "child_process";
import { join } from "path";
import { existsSync } from "fs";

function isMusl(): boolean {
  const output = spawnSync("ldd", ["--version"]).stderr.toString();
  return output.indexOf("musl") >= 0;
}

function archName(): string {
  switch (process.arch) {
    case "x64":
      return "amd64";
    default:
      throw new Error(`Unsupported architecture ${process.arch}`);
  }
}

function platformName(): string {
  switch (process.platform) {
    case "darwin":
      return "macos";
    case "linux":
      return isMusl() ? "linux-musl" : "linux";
    default:
      throw new Error(`Unsupported platform: ${process.platform}`);
  }
}

/** Return a path to the dbmate binary */
function calculateBinaryPath(): string {
  const binaryName = `dbmate-${platformName()}-${archName()}`;
  const binaryPath = join(__dirname, "..", "binaries", binaryName);

  if (!existsSync(binaryPath)) {
    throw new Error(`Could not locate binary: ${binaryPath}`);
  }

  return binaryPath;
}

export { calculateBinaryPath };
