const express = require("express"); //library to handle the port and server.
const app = express();
const http = require("http");
const socket_io = require("socket.io"); //library to handle socket.
const winston = require("winston"); // library to handle logging
const moment = require("moment"); // library to handle time and dates.
const formatMessage = require("./stuff/messages");
const { userJoin, getCurrentUser } = require("./stuff/user");

//Winston logger with  time addition
const logger = winston.createLogger({
  transports: [new winston.transports.Console({ timestamp: true })],
});
//Server
const server = http.createServer(app);
const io = socket_io(server);

//Logs when client connects to the server.
io.on("connection", (socket) => {
  socket.on("joinUser", ({ username }) => {
    const user = userJoin(socket.id, username);

    logger.info(
      `${moment().format("[]L []LTS")} -> New client ${
        user.username
      } connected!!`
    );
    socket.emit("message", formatMessage(`Admin`, `Welcome  ${user.username}`));

    //when client connects
    socket.broadcast.emit(
      "message",
      formatMessage(`Admin`, `${user.username} has joined the chat`)
    );
  });

  //Runs when client disconnects
  socket.on("disconnect", () => {
    logger.info(`${moment().format("[]L []LTS")} -> User has left the chat!!`);
    io.emit("message", formatMessage(`Admin`, `User has left the chat`));
  });

  //Listen for char message.
  socket.on("chartMessage", (msg) => {
    const user = getCurrentUser(socket.id);

    io.emit("message", formatMessage(user.username, msg));
  });
});

//PORT settings
server.listen("4500", "0.0.0.0", () => {
  logger.info(
    `${moment().format("[]L []LTS")} ->  Server running on port 4500`
  );
});

//setting static path!! ||  @akar016012
app.use(express.static("public"));
