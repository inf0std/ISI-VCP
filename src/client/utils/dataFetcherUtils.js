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

const logout = () => {
  console.log("sending logout req");
  return fetch(`${config.app_url}:${config.app_port}/api/account/logout`);
};
const getData = (id) => {
  return get(`${config.app_url}:${config.app_port}/api/user/${id}/profile`);
};

const searchPeople = (query) => {
  return get(`${config.app_url}:${config.app_port}/api/user/logout`);
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
const fetchContacts = () => {};
let get = async (path) => {
  return fetch(path);
};

const searchConv = (uid, query) => {
  return post(
    query,
    `${config.app_url}:${config.app_port}/api/user/${uid}/conversation/search`
  );
};

const searchUsers = (uid, query) => {
  return post(
    `${config.app_url}:${config.app_url}/api/user/${uid}/people/search`
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
  searchUsers,
  sendSignupData,
  fetchConversation,
  fetchConversations,
  fetchContacts,
  getData,
  logout,
};
