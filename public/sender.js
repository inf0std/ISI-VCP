let configuration = {
  iceServers: [
    {
      urls: [
        "stun:stun.l.google.com:19302",
        "stun:stun1.l.google.com:19302",
        "stun:stun2.l.google.com:19302",
      ],
    },
  ],
};

let localStream;
let peers = [];
let isAudio = true;
let username;
const Connection = (id) => {
  this.id = id;
  this.peer = new RTCPeerConnection(configuration);

  this.peer.onicecandidate((candidate) => {
    socket.emit("candidate", { connectionId: this.id, candidate: candidate });
  });

  this.createAndSendOffer = () => {
    this.peer.createOffer((offer) => {
      socket.emit("description", { connectionId: this.id, description: offer });
    });
  };
};
const socket = io();
/*
socket.onmessage = (event) => {
  handleSignallingData(JSON.parse(event.data));
};
//*/

socket.on("candidate", (data) => {
  handleCandidate(data.connectionId, data.candidate);
});

socket.on("description", (data) => {
  handleRemoteDescritpion(data.connectionId, data.description);
});
/*
function handleSignallingData(data) {
  switch (data.type) {
    case "answer":
      peers.setRemoteDescription(data.answer);
      break;
    case "candidate":
      peers.addIceCandidate(data.candidate);
  }
}
//*/

const handleCandidate = (connectionId, candidate) => {
  peers[connectionId].addIceCandidate(candidate);
};

const handleRemoteDescritpion = (connectionId, description) => {
  peers[connectionId].setRemoteDescription(description);
};

function sendUsername() {
  username = document.getElementById("username-input").value;
  /* 
  sendData({
    type: "store_user",
  }); 
  //*/
  socket.emit("username", { username: username });
}

function sendData(data) {
  data.username = username;
  socket.send(JSON.stringify(data));
}

function startCall() {
  document.getElementById("video-call-div").style.display = "inline";

  navigator.getUserMedia(
    {
      video: {
        frameRate: 24,
        width: {
          min: 480,
          ideal: 720,
          max: 1280,
        },
        aspectRatio: 1.33333,
      },
      audio: true,
    },
    (stream) => {
      localStream = stream;
      document.getElementById("local-video").srcObject = localStream;

      let connectionId = peers.push(new RTCPeerConnection(configuration));
      peers.addStream(localStream);

      peers.onaddstream = (e) => {
        document.getElementById("remote-video").srcObject = e.stream;
      };

      peers.onicecandidate = (e) => {
        if (e.candidate == null) return;
        sendData({
          type: "store_candidate",
          candidate: e.candidate,
        });
      };

      createAndSendOffer();
    },
    (error) => {
      console.log(error);
    }
  );
}

function createAndSendOffer(connectionId) {
  peers[connectionId].createOffer(
    (offer) => {
      /* 
      sendData({
        type: "store_offer",
        offer: offer,
      });
      //*/

      socket.emit("description", {
        type: "store_offer",
        offer: offer,
      });

      peers[connectionId].setLocalDescription(offer);
    },
    (error) => {
      console.log(error);
    }
  );
}

function muteAudio() {
  isAudio = !isAudio;
  localStream.getAudioTracks()[0].enabled = isAudio;
}

let isVideo = true;
function muteVideo() {
  isVideo = !isVideo;
  localStream.getVideoTracks()[0].enabled = isVideo;
}
