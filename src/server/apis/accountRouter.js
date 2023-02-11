const {
  handleLogin,
  handleValidateEmail,
  handleSignup,
  handleLogout,
  sendProfileImage,
} = require("./handlers/accountHandlers");
const accountRouter = require("express").Router();

accountRouter.get("/validate/:id", handleValidateEmail);
accountRouter.get("/logout", handleLogout);
accountRouter.post("/login", handleLogin);
accountRouter.post("/signUp", handleSignup);
//accountRouter.get("/profile/:id/img", sendProfileImage);

module.exports = accountRouter;
