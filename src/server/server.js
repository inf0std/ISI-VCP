const { randomUUID } = require("crypto");
const userManager = require("./modules/userManager");
const errorCodes = require("./utils/errorCodes");

var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", function (req, res) {
  res.send("hello there");
});

io.on("connection", function (socket) {
  console.log("a user connected");
  socket.on("user", (data) => {
    userManager.addSocketToUser(data.userId, socket.id).catch((err) => {
      if (err == errorCodes.user_not_exists) {
        //add the user to the userManager
      }
    });
    /*
    io.emit("userConnected", {
      socketId: socket.id,
      userName: data.userId,
    });
    //*/
  });

  socket.on("videoCallRequest", (data) => {
    let socketid;
    if (!data.socketid && data.userId) {
      socketid = users.indexOf(data.userId);
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
    for (u in data.invitedUsers) {
      userManager.getUserSockets(u.id).forEach((socketId) => {
        io.to(socketId).emit("inviteToJoinRoom", {
          roomId: data.roomId,
          userid: socket.id,
        });
      });
    }
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

    const user = findUser(data.userId);

    switch (data.type) {
      case "store_user":
        if (user != null) {
          return;
        }

        const newUser = {
          conn: connection,
          userId: data.userId,
        };

        users.push(newUser);
        console.log(newUser.userId);
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
/*
function findUser(userId) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].userId == userId) return users[i];
  }
}
//*/
