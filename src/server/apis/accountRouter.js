//const { require } = require("yargs");
const {
  handleLogin,
  handleValidateEmail,
  handleSignup,
  handleLogout,
  sendProfileImage,
} = require("./handlers/accountHandlers");
const{handleCreateReunion} = require("./ReunionRouteHandlers")
const accountRouter = require("express").Router();

accountRouter.get("/validate/:id", handleValidateEmail);
accountRouter.get("/logout", handleLogout);
accountRouter.post("/login", handleLogin);
accountRouter.post("/signUp", handleSignup);
accountRouter.post("/progReun", handleCreateReunion);
//accountRouter.get("/profile/:id/img", sendProfileImage);

module.exports = accountRouter;
