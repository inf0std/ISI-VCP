const express = require('express');
const socket = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socket(server,{
    cors:{
        origin :"*",//any user
        methods :["GET","Post"]
    }
})

let PORT = 5000;
server.listen(PORT, () => {
    console.log("Listening in the port",PORT);
  })

io.on("connection", (socket) => {
    console.log("connected to", socket.id)
    socket.on("message", (message) => {
        io.sockets.emit("message_client", {
        
            message,
        })
    })
})