const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');




//commentaire
//comment 2
const  app = express();
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));


app.get('/',(req, res) =>{
    console.log("requete de connexion")
})



app.listen(8080,()=> console.log("listening to port 8080"))