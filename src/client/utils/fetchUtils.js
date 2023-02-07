const getConversations = async (userId) => {
  return fetch(`http://127.0.0.1:8080/api/router/user/${userId}/conversations`)
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });
};

const getConversation = async (userId, convId) => {
  return fetch(
    `http://127.0.0.1:8080/api/router/user/${userId}/conversations/${convId}`
  )
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });
};

const getContacts = async (userId) => {
  return fetch(`http://127.0.0.1:8080/api/router/user/${userId}/contacts`)
    .then((response) => response.json)
    .catch((err) => {
      console.log(err);
    });
};

export { getContacts, getConversation, getConversations };
