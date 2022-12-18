import { memo } from "react";
import VideoControls from "./videoControls/VideoControls";
const VideoElemt = (props) => {
  return (
    <>
      <video></video>
      <VideoControls />
    </>
  );
};
export default memo(VideoElemt);
