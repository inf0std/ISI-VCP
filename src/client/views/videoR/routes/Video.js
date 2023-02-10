import { useRef, useEffect, useContext } from "react";
import { RoomContext } from "./RoomContext";
import classNames from "classnames";
import "./Video.css";
export const Video = (props) => {
  const { nbrPart } = useContext(RoomContext);
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return (
    <video
      className={classNames({
        video1: nbrPart + 1 === 1,
        video2: nbrPart + 1 === 2,
        video3_4: nbrPart + 1 >= 3,
        video5_6: nbrPart + 1 >= 5,
        video4_9: nbrPart + 1 >= 7,
        video10_12: nbrPart + 1 >= 10,
        video13_20: nbrPart + 1 >= 12,
      })}
      playsInline
      autoPlay
      ref={ref}
    />
  );
};
