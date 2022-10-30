const express = require("express")

var app = express()

app.get('/',(req, res) =>{
    console.log("requete de connexion")
})

app.listen(3000)