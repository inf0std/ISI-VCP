const jwt = require("jsonwebtoken");

//user route handlers
const {
  handleUserConversations,
  handleUserContacts,
  handleuserreunion,
  handleuserconference,
  handleGetData,
} = require("./userRouteHandlers");

const userRouter = require("express").Router();

userRouter.use((req, res, next) => {
  let id = req.params.id;
  console.log("credentials validation", id);
  if (req.session.id) {
    console.log("session exists", id);
    if (req.session.id == id) {
      console.log("session id ");
      next();
    } else {
      console.log(req.session.id);
      res.status(401).send({ error: "Unauthorised" });
    }
  } else if (req.cookies.token) {
    try {
      let { _id } = jwt.verify(token, process.env.s_key);
      if (id == _id) {
        next();
        return;
      } else res.status(401).send({ error: "Unauthorised" });
    } catch (err) {
      res.status(400).send({ error: "token expired" });
    }
  }
});
userRouter.get("/:id", handleGetData);
userRouter.get("/:id/conferences", handleuserconference);
userRouter.get("/:id/reunions", handleuserreunion);
userRouter.get("/:id/contacts", handleUserContacts);
//userRouter.get("/:id/people", handleSearchPeople);
userRouter.get("/:id/conversations", handleUserConversations);
userRouter.get("/:id/conversations/:convId", handleGetConversation); /* 
userRouter.post("/programme/conference", handleProgrammeConference);
userRouter.post("/programme/reunion", handleProgrammeReunion);
userRouter.post("/programme/debate", handleProgrammeDebate); */

module.exports = userRouter;
