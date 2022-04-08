const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = 3001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);
server.listen(port, () => console.log(`Listening on port ${port}`));

const io = socketIo(server, { cors: { original: "*" } });
let interval;
io.on("connection", (socket) => {
  console.log("New socket client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiandEmit(socket), 1500);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});
const getApiandEmit = (socket) => {
  const quote = [
    "The way I see it, if you want the rainbow, you gotta put up with the rain",
    "Life is like riding a bicycle. To keep your balance, you must keep moving",
    "Start where you are. Use what you have. Do what you can",
    "Life is much better when you are living in the present moment",
    "Your time is limited, so don't waste it living someone else's life",
  ];
  const index = Math.floor(Math.random() * 5);
  socket.emit("GetNumber", quote[index]);
};
