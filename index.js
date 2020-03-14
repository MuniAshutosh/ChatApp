const path = require('path');
const express = require("express");
const http = require('http');
const socket = require("socket.io");
const port = process.env.PORT || 4000;
const publicPath = path.join(__dirname, '/public');

var app = express();
var server = http.createServer(app);
var io = socket(server);


// //static files
app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});

io.on("connection", function(socket) {
  console.log("made socket connection:", socket.id);

  socket.on("chat", function(data) {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", function(data) {
    socket.broadcast.emit("typing", data);
  });
});
