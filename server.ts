require("dotenv").config();

import { errorHandler, socketHandler, wifiHandler } from "./lib";

// Error Handler on uncaughtException
errorHandler();

// IIFE for async/await
(async () => {
  // Initial wifi handler
  await wifiHandler();

  // Socket handler
  socketHandler();
})();
