import http from "node:http";
import { WebSocketServer } from "ws";

const server = http.createServer((_req, res) =>
  res.end("Hello, Motherfucker!")
);

const wss = new WebSocketServer({ server });

wss.on("headers", (headers, req) => console.log(headers));

wss.on("connection", (socket, req) => {
  socket.send("Hello");

  socket.on("message", (msg) => console.log("🚀 ~ wss.on ~ msg", msg));
});

server.listen(5000);
