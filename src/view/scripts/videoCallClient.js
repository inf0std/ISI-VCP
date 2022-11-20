const express = require("express")
const http = require("hhtp")
const app = express()
const server = http.createServer(app)
const socket = require("socket.io")
const io = socket(server)








server.listen(3000,() => console.log("hello you"))








