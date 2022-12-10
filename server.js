const { randomUUID } = require("crypto");

var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", function (req, res) {
  res.send("hello there");
});

let users = [];
io.on("connection", function (socket) {
  console.log("a user connected");
  socket.on("username", (data) => {
    users[socket.id] = data.username;
    io.emit("userConnected", {
      socketId: socket.id,
      userName: data.username,
    });
  });

  socket.on("videoCallRequest", (data) => {
    let socketid;
    if (!data.socketid && data.username) {
      socketid = users.indexOf(data.username);
    }

    io.to(data.socketId || socketid).emit("videoCallRequest", {
      socketId: socket.id,
    });
  });

  socket.on("rejectVideoCallRequest", (data) => {
    io.to(data.socketId).emit("rejectVideoCallRequest", {
      socketId: socket.id,
    });
  });

  socket.on("acceptVideoCallRequest", (data) => {
    io.to(data.socketId).emit("acceptVideoCallRequest", {
      socketId: socket.id,
    });
  });

  socket.on("Room", (data) => {
    roomName = generateConnectionId();
    socket.emit("videoRoom", { roomId: roomName });
  });

  socket.on("joinRoom", (data) => {
    socket.join(data.roomId);
    io.to(data.roomId).emit("userJoined", {
      roomId: data.roomId,
      socketId: socket.id,
    });
  });

  socket.on("inviteToJoinRoom", (data) => {
    for (u in data.invitedUsers)
      io.to(u.socketid).emit("inviteToJoinRoom", {
        roomId: data.roomId,
        userid: socket.id,
      });
  });
});

http.listen(3000, function () {
  console.log("listening on *:3000");
});

const generateConnectionId = () => {
  return randomUUID();
};
webSocket.on("request", (req) => {
  const connection = req.accept();

  connection.on("message", (message) => {
    const data = JSON.parse(message.utf8Data);

    const user = findUser(data.username);

    switch (data.type) {
      case "store_user":
        if (user != null) {
          return;
        }

        const newUser = {
          conn: connection,
          username: data.username,
        };

        users.push(newUser);
        console.log(newUser.username);
        break;
      case "store_offer":
        if (user == null) return;
        user.offer = data.offer;
        break;

      case "store_candidate":
        if (user == null) {
          return;
        }
        if (user.candidates == null) user.candidates = [];

        user.candidates.push(data.candidate);
        break;
      case "send_answer":
        if (user == null) {
          return;
        }

        sendData(
          {
            type: "answer",
            answer: data.answer,
          },
          user.conn
        );
        break;
      case "send_candidate":
        if (user == null) {
          return;
        }

        sendData(
          {
            type: "candidate",
            candidate: data.candidate,
          },
          user.conn
        );
        break;
      case "join_call":
        if (user == null) {
          return;
        }

        sendData(
          {
            type: "offer",
            offer: user.offer,
          },
          connection
        );

        user.candidates.forEach((candidate) => {
          sendData(
            {
              type: "candidate",
              candidate: candidate,
            },
            connection
          );
        });

        break;
    }
  });

  connection.on("close", (reason, description) => {
    users.forEach((user) => {
      if (user.conn == connection) {
        users.splice(users.indexOf(user), 1);
        return;
      }
    });
  });
});

function sendData(data, conn) {
  conn.send(JSON.stringify(data));
}

function findUser(username) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].username == username) return users[i];
  }
}
