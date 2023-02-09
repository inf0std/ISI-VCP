import config from "../config.json";
const sendSigninData = (data) => {
  return post(
    { email: data.email, password: data.password },
    `${config.app_url}:${config.app_port}/api/account/login`
  );
};
const sendSignupData = (data) => {
  return post(
    {
      email: data.email,
      password: data.password,
      password2: data.password2,
      phone: data.phone,
      username: data.username,
    },
    `${config.app_url}:${config.app_port}/api/account/signup`
  );
};

const fetchConversations = (uid) => {
  return get(
    `${config.app_url}:${config.app_port}/api/user/${uid}/conversation`
  );
};
const fetchConversation = (uid, cid) => {
  return get(
    `${config.app_url}:${config.app_port}/api/user/${uid}/conversation/${cid}`
  );
};
const fetchVideoCallData = (data) => {};
const fetchContacts = (data) => {};
let get = async (path) => {
  return fetch(path);
};

const searchConv = (uid, query) => {
  return post(
    query,
    `${config.app_url}:${config.app_port}/api/user/${uid}/conversation/search`
  );
};
let post = async (data, path) => {
  return fetch(path, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
};
export {
  sendSigninData,
  sendSignupData,
  fetchConversation,
  fetchConversations,
  fetchContacts,
};
