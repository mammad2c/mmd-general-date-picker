import os from "node:os";
import { exec } from "node:child_process";
import ci from "ci-info";

if (!ci.isCI) {
  exec("husky install", (_, stdout) => {
    console.log(stdout);
  });
}

if (!os.type().toLowerCase().includes("windows") && !ci.isCI) {
  console.log("Enabling husky on non Windows systems");
  exec("chmod ug+x .husky/*", (_, stdout) => {
    console.log(stdout);
  });
}
