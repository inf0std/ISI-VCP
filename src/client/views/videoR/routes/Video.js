import {useRef, useEffect, useContext} from "react"
import { RoomContext } from "./RoomContext";
import './Video.css'
export const Video = (props) => {
    const {nbrPart} = useContext(RoomContext)
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <video className="video2" playsInline autoPlay ref={ref} />
    );
}