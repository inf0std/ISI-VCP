const handleLogin = (req, res, next) => {
  console.log("Login attempt");
  const { email, password } = req.body;
  auth(email, password)
    .then((user) => {
      res.status(200).json(user.login);
    })
    .catch((err) => {
      res.json({
        message: "ERROR",
      });
    });
  next();
};

const handleSignUp = (req, res, next) => {
  const { email, password } = req.body;
  createUser(email, password)
    .then((user) => {
      res.json.status(200).json(user);
    })
    .catch((err) => {
      res.json({
        message: "ERROR",
      });
    });
  next();
};

const handleUserConversations = (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  User.findById(id)
    .select("conversations")
    .then((conversations) => {
      console.log(contacts);
      res.status(200).json(conversations);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "ERROR",
      });
    });
  next();
};

const handleUserContacts = (res, req, next) => {
  const id = req.params.id;
  console.log(id);
  User.findById(id)
    .select("contacts")
    .then((contacts) => {
      console.log(contacts);
      res.status(200).json(contacts);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "ERROR",
      });
    });
};
module.exports = {
  handleLogin,
  handleSignUp,
  handleUserConversations,
  handleUserContacts,
};
