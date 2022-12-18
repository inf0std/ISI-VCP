<<<<<<< HEAD
class VideoElemt extends React.Component {
    constructor(props){
      super(props)
    }
    render() {
      return (
        <div>ECRIRE VOTRE CODE ICI</div>
      );
    }
  }
=======
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
>>>>>>> origin/ui
