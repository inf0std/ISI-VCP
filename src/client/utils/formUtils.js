const validateEmail = (email) => {
  let re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validatePassword = (pwd1, pwd2) => {
  var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  return re.test(pwd1) && pwd1 === pwd2;
};

const validatePhoneNumber = (phoneNumber) => {
  phoneNumber = "" + phoneNumber;
  let re =
    /^(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?$/;
  return re.test(phoneNumber);
};

const isAlphanumeric = (str) => {
  let re = /^[a-zA-Z0-9]+$/;
  return re.test(str);
};

module.exports = {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  isAlphanumeric,
};
