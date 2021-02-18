var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

const getVisitors = () => {
  let clients = io.sockets.clients().connected;
  let sockets = Object.values(clients);
  //console.log(sockets);
  let users = sockets.map((s) => s.user);
  //console.log(users);
  return users;
};

const emitVisitors = () => {
  io.emit("visitors", getVisitors());
};

io.on("connection", function (socket) {
  console.log("a user connected");

  socket.on("new_visitor", (user) => {
    console.log("new_visitor", user);
    socket.user = user;
    emitVisitors();
  });

  socket.on("disconnect", function (msg) {
    emitVisitors();
    console.log("user disconnected");
  });

  socket.on("new_visitor", (user) => {
    console.log("new_visitor", user);
    socket.user = user;
  });

  socket.on("chat message", function (msg) {
    io.emit("chat message", msg);
  });
});

http.listen(3003, function () {
  console.log("listening on *:3003");
});
