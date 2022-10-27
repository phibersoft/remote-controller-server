import { Server } from "socket.io";
import { action_keypress, lol } from "./events";
import { logger } from "./utils";

const PORT = Number(process.env.PORT) || 9292;

const socketHandler = () => {
  const io = new Server(PORT, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    logger(`User Connected: ${socket.id}`);

    socket.on("action_keypress", action_keypress);
    socket.on("lol", lol);

    socket.on("disconnect", (s) => {
      logger(`User Disconnected: ${socket.id}, Reason: ${s}`, "warn");
    });
  });

  return io;
};

export { socketHandler };
