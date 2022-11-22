require("dotenv").config
const express = require('express')
const http = require('http')
const uuid =require('uuid')
const path = require('path')
const app=express()
const port = process.env.PORT || 5000

const server =http.createServer(app)
const io = require('socket.io')(server,{
    cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
})
const rooms={};
const leaveRoom =  (rooms,socket,{roomId,peerId})=>{
    rooms[roomId]= rooms[roomId].filter((id) => id !== peerId )
    socket.to(roomId).emit("user-disconnected",peerId)
}
//connectin a la socket
io.on("connection",(socket)=>{
    console.log('user connected')
     
    //cree une room
	socket.on ("create-room",()=>{
        const roomId= uuid.v4()
        rooms[roomId]=[]
        console.log('user create room')
        socket.emit("room-created",{roomId})

    })
    socket.on("join-room", ({roomId, peerId})=>{
        if (rooms[roomId]){
            console.log('user joind a room',roomId + peerId)
            rooms[roomId].push(peerId)
            socket.join(roomId)
            console.log('passer')
            socket.to(roomId).emit("user-joined",{peerId})
            socket.emit("get-users",{
                roomId,
                participants: rooms[roomId]
            })
        }
        socket.on("disconnect",()=>{
            console.log("user left the room",peerId);
            leaveRoom(rooms,socket,{roomId,peerId})
        })
    })


    socket.on("disconnect",()=>{
        console.log('user disconnectd')
    })

})
    app.use(express.static(path.join(__dirname, 'public')));
    app.get('/*', (req,res)=>{
        res.sendFile(path.join(__dirname, './front/public/index.html'))
    })


server.listen(port, ()=>{
    console.log('server running at ',port)
})