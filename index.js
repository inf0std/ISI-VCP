const app = require("./src/server/server");

app.get("/", (req, res) => {
  console.log("requete de connexion");
});
let port = 8080;
app.listen(port, () => {
  console.log("listening on port ", port);
});
