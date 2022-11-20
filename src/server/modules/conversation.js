
const Conversation = (config)=>{
    //les utilisateurs qui font partie de la conversation
    this.users = []
    this.usersId = []
    //nom de la conversation
    this.name = '';
    //id de la conversation
    this.id = null;
    //la room de socket.io
    this.room = null;

    //ajouter un utilisateur a la liste des utilisateur connecte a la conversation
    this.addUser = (user)=>{
        if(this.usersId[user.id]) {
            // ajouter l.utilisateur a la liste des utilisateurs
            this.users[user.id] = user;
            //notifier les autre utilisateur qu'un utilisateur c'est connecte
            this.room.emit('userJoined', {
                userId : user.id,
                userName : user.name 
            })
            //utilisateur a joigne la conversation
            return true;
        }
        //utilisateur n'a pas joigne la conversation
        return false;
    }

    this.inviteUser = (userId)=>{

    }

    this.leave = (userId)=>{

    }


}