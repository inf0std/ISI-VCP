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
    const [videostream, setstream]= useState()
    const peersRef = useRef([]);
    const roomID = useParams();
    const nbrPart= useRef(0)

    useEffect(()=>{
        if (flag.current === false){
            flag.current = true

            navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
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
    function shareScreen() {
        
        var track = videostream.getTracks().find(track => track.kind === 'video');
        navigator.mediaDevices
        .getDisplayMedia({ video:true, audio:true })
        .then((stream) => {
            Object.values(peersRef).forEach((peer)=>{
            
          const screenTrack = stream.getTracks()[0];
          
          peer.removeTrack(track)
          peer.addTrack(screenTrack)
        }) }    
        )}
   
    return(
        <RoomContext.Provider value={{ws,videostream, peers, nbrPart, shareScreen}}>
            {children}
        </RoomContext.Provider>
    )

}