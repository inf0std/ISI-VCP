const app = require("./src/server/server")

app.get('/', (req, res) => {
    console.log("requete de connexion")
})

app.listen(3000)