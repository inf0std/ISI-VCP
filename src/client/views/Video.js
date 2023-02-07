import {useRef, useEffect, useContext} from "react"

export default function Video(props) {
    const ref = useRef()
     if (props.stream != null){
        ref.current.srcObject = props.stream;  
     }
            
  return (
    <video className="video2" playsInline autoPlay ref={ref} />
  )
}
