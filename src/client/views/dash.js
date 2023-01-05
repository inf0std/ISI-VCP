import "./dash.css";
import MainDash from "../component/dash/MainDash/MainDash";
import RightSide from "../component/dash/RigtSide/RightSide";
import Sidebar from "../component/dash/Sidebar";
import { useState } from "react";
function Dashbord() {
  var [aff, setaff] = useState(0);
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar affichage={setaff} />
        <MainDash serch={aff} />
        <RightSide />
      </div>
    </div>
  );
}

export default Dashbord;
