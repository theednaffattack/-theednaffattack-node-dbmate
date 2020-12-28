#!/usr/bin/env node

import { calculateBinaryPath } from "./resolve";
import { spawn } from "child_process";

const binaryPath = calculateBinaryPath();
const args = process.argv.slice(2);
const ps = spawn(binaryPath, args, {
  stdio: "inherit",
});

ps.on("close", (code) => {
  process.exit(code);
});
