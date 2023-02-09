const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.APP_MAIL || "seen.project.cpi@gmail.com",
    pass: process.env.APP_MAIL_PWD || "imycppaougenucwm",
  },
  tls: {
    rejectUnauthorized: false,
  },
});
const emailBody = (email, id, name, token) => {
  return {
    from:
      '"SEEN PLATFORME" <' +
      (process.env.APP_MAIL || "seen.project.cpi@gmail.com") +
      ">",
    to: email,
    subject: `${name}  verify your email`,
    html: `<h2> DEAR ${name}! WELCOME TO THE SEEN FAMILY </h2>
        <h4>Please verify your email by clicking on the link bellow to continue... </h4><p><br/>
        <a href = "${process.env.APP_URL}/api/account/ver/${id}/${email}/${token}">
        verify your email
        </a> <br>this link will only remain available for the next 24 hours</p>`,
  };
};
const sendLinkValidationEmail = (email, id, name, token) => {
  transporter
    .sendMail(emailBody(email, id, name, token))
    .then((info) => {
      console.log(info);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { sendLinkValidationEmail };
