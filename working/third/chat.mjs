import express from "express";
import * as url from "url";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

app.use(
  express.static(url.fileURLToPath(new URL(".", import.meta.url)) + "/public")
);

const httpServer = createServer(app);

const io = new Server(httpServer, {
  /* options */
});

io.of("/shit").on("connect", (socket) => {
  socket.on("shit-client", (data) => console.log(data));
  socket.emit("shit-server", "some shit from serve!!!!!!!!!!!!!!!!!!!!!!!!!r");

  socket.join("shit-room");

  // socket.to("shit-room").emit("joined", `${socket.id} Joined shit`);

  io.of("/shit")
    .to("shit-room")
    .emit("joined", `${socket.id} joined fucking room`);
});

io.on("connection", (socket) => {
  // console.log("🚀 ~ io.on ~ socket", socket);
  setInterval(
    () => socket.emit("form-server", { data: "HELLO, MOTHERFUCKER!!!" }),
    500
  );
  // ...
  socket.emit("form-server", { data: "HELLO, MOTHERFUCKER!!!" });
  socket.on("to-server", (data) => {
    console.log("🚀 ~ socket.on ~ data", data);
  });

  // setTimeout(
  //   () => io.of("/admin").emit("shit-server", "from main namespace"),
  //   1000
  // );

  socket.on("chat-from-client", (data) => {
    console.log("🚀 ~ socket.on ~ data", data);
    io.emit("chat-from-server", { shit: data.text.toUpperCase() + data.text });
  });
});

httpServer.listen(5000);
