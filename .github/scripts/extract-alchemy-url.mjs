import { readFileSync } from "node:fs";

const [inputPath] = process.argv.slice(2);

if (!inputPath) {
  throw new Error("Usage: extract-alchemy-url.mjs <deploy-log-path|->");
}

const deployLog = readFileSync(inputPath === "-" ? 0 : inputPath, "utf8").replace(
  /\u001b\[[0-?]*[ -/]*[@-~]/g,
  "",
);
const matches = [
  ...deployLog.matchAll(/(?:["']?url["']?)\s*:\s*(["'])(https:\/\/[^"']+)\1/g),
];
const deploymentUrl = matches.at(-1)?.[2];

if (!deploymentUrl) {
  throw new Error("Alchemy completed without printing a deployment URL");
}

const parsedUrl = new URL(deploymentUrl);
if (parsedUrl.protocol !== "https:") {
  throw new Error(`Expected an HTTPS deployment URL, received ${parsedUrl.protocol}`);
}

process.stdout.write(parsedUrl.href);
