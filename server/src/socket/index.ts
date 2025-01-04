import { IncomingMessage, ServerResponse, Server as TServer } from "http";
import { Server } from "socket.io";
import { socketHandlers } from "./handlers";

export function connectSocket(
  server: TServer<typeof IncomingMessage, typeof ServerResponse>
) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", socketHandlers);
}
