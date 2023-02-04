//userId variable gloal contenant le id de l'utilisateur courant
const sendMsg = (content, convId) => {
  Socket.emit("msg", {
    senderId: userId,
    convId: convId,
    msg: {
      senderId: userId,
      content: content,
    },
  });
};

const sendVideoCallRequest = (calleeId) => {
  /*
    call initialization here
  */
  Socket.emit("videoCallRequest", {
    callerId: userId,
    calleeId: calleeId,
  });
};

const sendAudioCallRequest = (calleeId) => {
  /*
    call initialization here
  */
  Socket.emit("audioCallRequest", {
    callerId: userId,
    calleeId: calleeId,
  });
};

const answerVideoCall = (callerId, callerSocketId) => {
  /*
    handle ui changes here
    */
  Socket.emit("videoCallAnswer", {
    callerId: callerId,
    calleeId: userId,
    callerSocketId: callerSocketId,
  });
};

const answerAudioCall = (callerId, callerSocketId) => {
  //handle ui changes here
  Socket.emit("audioCallAnswer", {
    callerId: callerId,
    calleeId: userId,
    callerSocketId: callerSocketId,
  });
};

const sendIceCandidate = (ice, receiverId, receiverSocketId) => {
  Socket.emit("ice", {
    ice: ice,
    receiverId: receiverId,
    senderId: userId,
  });
};

const sendOffer = (offer, calleeId, calleeSocketId) => {
  Socket.emit("offer", {
    offer: offer,
    calleeId: receiverId,
    callerId: userId,
    calleeSocketId: calleeSocketId,
  });
};

const sendAnswer = (answer, callerId, callerSocketId) => {
  Socket.emit("answer", {
    answer: answer,
    callerId: callerId,
    calleeId: userId,
    callerSocketId: callerSocketId,
  });
};

Socket.on('msg', {convId, msg}=>{
    //handle received msg here
})

socket.on("videoCallRequest", ({ callerId, calleeId , callerSocketId}) => {
    if(calleeId == userId){
        //display the incoming videocall screen
    }else{
        //error message in console
    }
    
})
socket.on("audioCallRequest", ({ callerId, calleeId, callerSocketId}) => {
    if(calleeId == userId){
        //display the incoming videocall screen
    }else{
        //error message in console
    }
})
socket.on("videoCallAnswer", ({ callerId, calleeId, callerSocketId }) => {
    if(callerId == userId){
        //display the videoroom and estabilish comunication
    }else{
        //error message in console
    }
})
socket.on("audioCallAnswer", ({ callerId, calleeId, callerSocketId }) => {
    if(callerId == userId){
        //display the videoroom with audio only
    }else{
        //error message in console
    }
})
socket.on("videoCallReject", ({ callerId, calleeId, callerSocketId }) => {
    if(callerId == userId){
        //dismiss videocall requesting screen
    }else{
        //error message in console
    }
})
socket.on("audioCallReject", ({ callerId, calleeId, callerSocketId }) => {
    if(calleeId == userId){
       //dismiss audiocall requesting screen
    }else{
        //error message in console
    }
})
socket.on("offer", ({ offer, callerId, calleeId, calleeSocketId }) => {
    //check correspondants ids
    //add ofer to the rtcpeerconnection peer
})
socket.on("answer", ({ answer, callerId, calleeId, callerSocketId }) => {
    //check the corespondants ids
    //add the answer to the rtc peer connection peers
})
socket.on("ice", ({ ice, senderId, receiverId, receiverSocektId }) => {
    //check the correspondants ids
    //add the ice to the peer
})