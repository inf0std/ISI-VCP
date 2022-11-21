const conversation = require('./conversation');

const currentConvs = []

const joinConv = (user, convId)=>{
    var conv = findConv(convId);
    if(!conv){
        conv = loadConvFromDb(convId);
        currentConvs[convId] = conv;
    }
    conv.addUser(user);
}

const leaveConv = (user, convId)=>{
    
}

const loadConvFromDb = (convId) =>{
    //empty for now
}

const findConv = (id)=>{
    return (currentConvs[id] ? currentConvs[id] : null)
}

const saveConvIntoDB = (conv)=>{
    //empty for now
}
const createConv = (config)=>{
    const {nameConv, creatorId, usersId, idConv, moderator} = config;
    var conv = new conversation(config);
    try{
        saveConvIntoDB(conv);
    }catch(err){
        console.log(err);
    }
    currentConvs[idConv] = conv;
}

const conversationManager = (io)=>{
    this.io = io;
}

module.exports = conversationManager;