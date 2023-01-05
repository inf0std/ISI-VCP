import React from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import Usertabe from "../Table/Usertabe";

import Formsearch from "../Searchform/Searchform";

import "./MainDash.css";
const MainDash = (props) => {
  return (
    <div className="MainDash">
      <h1>Dashboard</h1>
      {props.serch == 1 && (
        <>
          <Formsearch />
          <Usertabe />
        </>
      )}
      {props.serch == 0 && (
        <>
          <Cards />
          <Table />
        </>
      )}
    </div>
  );
};

export default MainDash;
