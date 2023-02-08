import React, {createContext, useEffect, useRef, useState} from 'react'
import socketIOClient from "socket.io-client";
import {useParams} from "react-router-dom"
import Peer from "simple-peer"
const WS ='http://localhost:8080'

export const RoomContext = createContext();

const ws = socketIOClient(WS)
export function ContextProvider ({children}){
    const flag = useRef(false)
    const [peers, setPeers] = useState([]);
    const [stream, setstream]= useState()
    const peersRef = useRef([]);
    const roomID = useParams();
    const nbrPart= useRef(0)
    const [screenShId, setScreenShId] = useState()
    const [me, setMe]= useState()
    const senders = useRef([])
    const oldtrack = useRef(null)

    useEffect(()=>{
        if (flag.current === false){
            flag.current = true

            navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
                oldtrack.current = stream.getTracks()[0]
                setstream(stream)
                ws.emit("join room", roomID);
                ws.on("all users", (users, nbr) => {
                    nbrPart.current = nbr;
                    const peers = [];
                    users.forEach(userID => {
                        const peer = createPeer(userID, ws.id, stream);
                        peer.peerID = userID;
                        peersRef.current.push({
                            peerID: userID,
                            peer,
                        })
                        peers.push(peer);
                    })
                    setPeers(peers);
                })
    
                ws.on("user joined", payload => {
                    const peer = addPeer(payload.signal, payload.callerID, stream);
                    peersRef.current.push({
                        peerID: payload.callerID,
                        peer,
                    })
    
                    setPeers(users => [...users, peer]);
                });
    
                ws.on("receiving returned signal", payload => {
                    const item = peersRef.current.find(p => p.peerID === payload.id);
                    item.peer.signal(payload.signal);
                });
            })
        }
        }, [roomID]);
    
        function createPeer(userToSignal, callerID, stream) {
            const peer = new Peer({
                initiator: true,
                trickle: false,
                stream,
            });
    
            peer.on("signal", signal => {
                ws.emit("sending signal", { userToSignal, callerID, signal })
            })
    
            return peer;
        }
    
        function addPeer(incomingSignal, callerID, stream) {
            const peer = new Peer({
                initiator: false,
                trickle: false,
                stream,
            })
    
            peer.on("signal", signal => {
                ws.emit("returning signal", { signal, callerID })
            })
    
            peer.signal(incomingSignal);
    
            return peer;
        }
        const switchStream =(stream)=>{
            setstream(stream);
            Object.values(peersRef).forEach((connection)=>{
                const videoTrack = stream?.getTracks().find(track => track.kind === 'video');
                connection.replaceTrack(videoTrack)
                .catch((err)=> console.log(err))
            })
    }
    function shareScreen() {
        
        navigator.mediaDevices
        .getDisplayMedia({ cursor: true })
        .then((stream) => {
            setstream(stream)
          const screenTrack = stream.getTracks()[0];       

          peersRef.current.forEach(({ peer }) => {
            console.log(peer)
            // replaceTrack (oldTrack, newTrack, oldStream);
            peer.replaceTrack(
              peer.streams[0].getTracks().find((track) => track.kind === 'video'),
              screenTrack,
              stream
            );
          });
    })}
        const shareScreenn=()=>{
            if (screenShId){
                navigator.mediaDevices.getUserMedia({video : true , audio: true}).then(switchStream)
            }else{
                navigator.mediaDevices.getDisplayMedia({}).then(switchStream)
            }
        }
   
    return(
        <RoomContext.Provider value={{ws,stream, peers, nbrPart, shareScreen}}>
            {children}
        </RoomContext.Provider>
    )

}