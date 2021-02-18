var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

const getVisitors = async () => {
  let clients = await io.sockets.clients().connected;
  let sockets = Object.values(clients);
  let users = sockets.map((s) => s.user);
  //console.log(sockets);
  return users;
};

const emitVisitors = async () => {
  io.emit("visitors", await getVisitors());
};

io.on("connection", function (socket) {
  console.log("a user connected");
  socket.on("chat message", function (msg) {
    io.emit("chat message", msg);
  });

  socket.on("new_visitor", async (user) => {
    console.log("new_visitor", user);
    socket.user = user;
    await emitVisitors();
  });

  socket.on("disconnect", function (msg) {
    emitVisitors();
    console.log("user disconnected");
  });
});

http.listen(3001, function () {
  console.log("listening on *:3001");
});
