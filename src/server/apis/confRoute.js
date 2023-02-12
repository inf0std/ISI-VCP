

//user route handlers
const {

  handleuserconference,

} = require("./userRouteHandlers");

const userRouter = require("express").Router();


userRouter.use(function timeLog(req, res, next) {
    console.log("Time: ", Date.now());
    next();
});

userRouter.get("/conference/:id", handleuserconference);
module.exports = userRouter;