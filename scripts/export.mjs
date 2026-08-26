/**
 * Statický export webu do priečinka out/.
 *
 * Beží cez Node, aby nastavenie premennej fungovalo rovnako na Windows
 * aj na macOS/Linuxe (zápis `VAR=1 príkaz` na Windows zlyhá).
 */
import { spawn } from "node:child_process";

const child = spawn("npx", ["next", "build"], {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, STATIC_EXPORT: "1" },
});

child.on("exit", (code) => process.exit(code ?? 1));
