const express = require("express")
//commentaire
//comment 2
var app = express()

app.get('/',(req, res) =>{
    console.log("requete de connexion")
})

app.listen(8080)