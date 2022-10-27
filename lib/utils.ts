export const sleeper = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const logger = (
  message: string,
  type: "info" | "error" | "warn" = "info"
) => {
  const colorPalette = {
    info: "\x1b[36m%s\x1b[0m", // cyan
    error: "\x1b[31m%s\x1b[0m", // red
    warn: "\x1b[33m%s\x1b[0m", // yellow
  };

  console.log(colorPalette[type], message);
};
