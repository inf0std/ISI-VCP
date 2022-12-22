import React from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import Formsearch from "../Searchform/Searchform";

import "./MainDash.css";
const MainDash = () => {
  return (
    <div className="MainDash">
      <h1>Dashboard</h1>
      <Cards />
      <Table />
      <Formsearch />
      <Table />
    </div>
  );
};

export default MainDash;
