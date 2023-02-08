import { useRef, useEffect } from "react";
import classNames from "classnames";
import "./Video.css";
/*
export default function Video(props) {
    const ref = useRef()
     if (props.stream != null){
        ref.current.srcObject = props.stream;  
     }
            
  return (
    <video className="video2" playsInline autoPlay ref={ref} />
  )
}
 */

const Video = ({ stream, Nbr_Partipents }) => {
  const videoRef = useRef();
  useEffect(() => {
    console.log(Nbr_Partipents);
    videoRef.current.srcObject = stream;
  }, [Nbr_Partipents, stream]);

  return (
    <video
      className={classNames({
        video1: Nbr_Partipents + 1 === 1,
        video2: Nbr_Partipents + 1 === 2,
        video3_4: Nbr_Partipents + 1 >= 3,
        video5_6: Nbr_Partipents + 1 >= 5,
        video4_9: Nbr_Partipents + 1 >= 7,
        video10_12: Nbr_Partipents + 1 >= 10,
        video13_20: Nbr_Partipents + 1 >= 12,
      })}
      ref={videoRef}
      autoPlay
    ></video>
  );
};

export default Video;
