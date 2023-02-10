const {
  handleLogin,
  handleValidateEmail,
  handleSignup,
  handleLogout,
} = require("./handlers/accountHandlers");
const accountRouter = require("express").Router();

accountRouter.get("/validate/:id", handleValidateEmail);
accountRouter.get("/logout", handleLogout);
accountRouter.post("/login", handleLogin);
accountRouter.post("/signUp", handleSignup);

module.exports = accountRouter;
