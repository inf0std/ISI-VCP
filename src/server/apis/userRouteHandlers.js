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
  next();
};

const handleconvesationmsg = function (req, res) {
  const id = req.params.id;
  console.log(id);
  readallMessages(id)
    .then((Messages) => {
      console.log(Messages);
      res.status(200).json(Messages);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "ERROR",
      });
    });
};
const handleconversation = function (req, res) {
  const id = req.params.id;
  console.log(id);
  readConversation(id)
    .then((Conversation) => {
      console.log(Conversation);
      res.status(200).json(Conversation);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "ERROR",
      });
    });
};
const handleuserorganisations = function (req, res) {
  const id = req.params.id;
  console.log(id);
  User.findById(id)
    .select("organisations")
    .then((organisations) => {
      console.log(organisations);
      res.status(200).json(organisations);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "ERROR",
      });
    });
};
const handleuserreunion = function (req, res) {
  const id = req.params.id;
  console.log(id);
  User.findById(id)
    .select("reunions")
    .then((reunions) => {
      console.log(reunions);
      res.status(200).json(reunions);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "ERROR",
      });
    });
};
const handleuserconference = function (req, res) {
  const id = req.params.id;
  console.log(id);
  User.findById(id)
    .select("conferences")
    .then((conferences) => {
      console.log(conferences);
      res.status(200).json(conferences);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "ERROR",
      });
    });
};
const handlevalidateemail = function (req, res) {
  const token = req.query.token;
  User.updateOne(
    { emailtoken: token },
    { emailtoken: null, isverified: true }
  ).then((user) => {
    return console.log({
      message: `${user.modifiedCount} updated successfully!`,
    });
  });
};
module.exports = {
  handleLogin,
  handleSignUp,
  handleUserConversations,
  handleUserContacts,
  handleconvesationmsg,
  handleconversation,
  handleuserorganisations,
  handleuserreunion,
  handleuserconference,
  handlevalidateemail,
};
