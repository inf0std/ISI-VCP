const {
  handleLogin,
  handleValidateEmail,
  handleSignup,
} = require("./handlers/accountHandlers");
const accountRouter = require("express").Router();

accountRouter.post("/login", handleLogin);
accountRouter.post("/signUp", handleSignup);
accountRouter.get("/verify/:id/:email/:token", handleValidateEmail);

module.exports = accountRouter;
