const jwt = require("jsonwebtoken");
const crypto = require("crypto");

//options
const options = { expiresIn: "24h" };

//generate a login token
const genLoginToken = (id) => {
  console.log(id);
  return generateToken({ id: id, nonce: nonce() }, options);
};
//generate an email validation toekn
const genEmailToken = (email) => {
  return generateToken({ email: email, nonce: nonce() }, options);
};
//generate a random nonce
const nonce = () => {
  return crypto.randomBytes(16).toString("hex");
};

//genrate a token from payload
const generateToken = (payload, options) => {
  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

module.exports = { genLoginToken, genEmailToken };
