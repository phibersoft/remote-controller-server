import { createInterface } from "readline";
import { writeFileSync } from "fs";
import { logger } from "./utils";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const errorHandler = () => {
  process.on("uncaughtException", (err) => {
    logger(`Error: ${err.message}`, "error");

    writeFileSync(`/tmp/error.log`, err.message);

    rl.question(`Press any key to exit...`, () => {
      process.exit(1);
    });
  });
};

export { errorHandler };
