import { startStarterApplication } from "./src/app";

async function main() {
  await startStarterApplication();
}

main().catch((error) => {
  console.error("Error starting the application:", error);
  process.exitCode = 1;
});