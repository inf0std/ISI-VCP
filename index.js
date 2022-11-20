const express = require('express');



//commentaire
//comment 2
const  app = express();


app.get('/',(req, res) =>{
    console.log("requete de connexion")
})



app.listen(8080,()=> console.log("listening to port 8080"))