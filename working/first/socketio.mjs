import http from "node:http";

import { Server } from "socket.io";

const server = http.createServer((_req, res) =>
  res.end("Hello, Motherfucker!")
);

// const wss = new WebSocketServer({ server });

// wss.on("headers", (headers, req) => console.log(headers));

const io = new Server(server);

io.on("connection", (socket, _req) => {
  console.log("🚀 ~ io.on ~ socket", socket);
  socket.emit("zalupa", "Hello");

  socket.on("shit", (msg) => console.log("🚀 ~ wss.on ~ msg", msg));
});

server.listen(5000);
