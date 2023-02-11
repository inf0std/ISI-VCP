import React, { useRef } from "react";

export default function Video({ stream }) {
  const Videoref = useRef();
  Videoref.current.srcObject = stream;
  console.log(Videoref.current);

  return <video srcObject={Videoref} autoPlay />;
}
