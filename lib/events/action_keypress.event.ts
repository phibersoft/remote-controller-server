import { keyTap } from "robotjs";
import { logger } from "../utils";

const action_keypress = (key: string, modifs?: string[] | string) => {
  if (typeof modifs === "string") {
    if (modifs === "[]") modifs = [];
    if (modifs === "[shift]") modifs = ["shift"];
  }

  logger(
    `Key Pressed: ${key} ${modifs ? (modifs as string[])?.join("+") : ""}`
  );
  keyTap(key, (modifs as string[]) || []);
};

export { action_keypress };
