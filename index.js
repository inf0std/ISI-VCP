const express = require("express")
const cookies = require('cookie')
const sessions = require('express-session')
//commentaire
//comment 2
var app = express()

app.get('/',(req, res) =>{
    console.log("requete de connexion")
})

app.listen(3000)