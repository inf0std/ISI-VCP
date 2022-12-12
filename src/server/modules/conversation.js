function Conversation(config) {
  const { usersIds, nameConv, idConv } = config;
  //les utilisateurs qui font partie de la conversation
  this.users = [];
  this.usersId = usersIds || [];
  //nom de la conversation
  this.name = "";
  //id de la conversation
  this.id = null;
  //la room de socket.io
  this.room = null;
  this.creatorId = null;

  //ajouter un utilisateur a la liste des utilisateur connecte a la conversation
  this.addUser = async (user) => {
    if (this.usersId.findIndex(user.id)) {
      // ajouter l.utilisateur a la liste des utilisateurs
      this.users[user.id] = user;
      return true;
    }
    //utilisateur n'a pas joigne la conversation
    return false;
  };

  this.inviteUser = (userId) => {};

  this.leave = (userId) => {};

  this.findUserById = async (id) => {
    return this.users[
      this.users.findIndex((u) => {
        return u.id == id;
      })
    ];
  };
}
/**
 * contient la structure et fonctionnalite d'une conversation
 * creation du room
 * envoie de message
 *
 */

module.exports = { Conversation };
