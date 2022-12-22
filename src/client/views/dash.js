import "./dash.css";
import MainDash from "../component/dash/MainDash/MainDash";
import RightSide from "../component/dash/RigtSide/RightSide";
import Sidebar from "../component/dash/Sidebar";

function Dashbord() {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <MainDash />

        <RightSide />
      </div>
    </div>
  );
}

export default Dashbord;
