import { useNavigate, useParams } from "react-router-dom";
import SideBarProfile from "./SideBarprofile";
import Navbarprofile from "./Navbarprofile";
import React, { useState, useEffect, useRef } from "react";
import {useNavigate} from "react-router-dom"
import { getData } from "../../utils/dataFetcherUtils";
import "./Sidebar.css";

const Profile = (props) => {
  const navigate = useNavigate()
  const { id } = useParams();
  const data = useRef({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      getData()
        .then((response) => response.json())
        .then((data) => {
          data.current = data;
        }).catch(err=>{
          navigate('/');
        })
    }
  }, []);

  return (
    <div>
      <div className="row">
        <Navbarprofile />
      </div>
      <div className="row">
        <SideBarProfile />
        <profileMenu data={data.current} />
      </div>
    </div>
  );
};
export default Profile;
