
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
app.use(express.static(__dirname+'/client'))
app.get("/",(req,res)=>{
    res.status(200);
    res.send('connected');
})
let PORT = 4000;
server.listen(PORT, () => {
    console.log("Listening in the port",PORT);
  })
  const room =[];

  const nvroom =(nom)=>{
    io.of(nom);
    room.push(nvroom);
  }
 /*nvroom ('room1');
 nvroom('room2');*/

  
io.on("connection", (socket) => {
    console.log("connected to", socket.id) 
    socket.join(["room1","room2"]);   
    io.to('room1').emit('msg', {
        room :"room1",
        msg :"joined room1"
    })
    socket.on("msg", (data) => {
        io.to(data.room).emit("msg", data)
        console.log("msg send");
    })
})
