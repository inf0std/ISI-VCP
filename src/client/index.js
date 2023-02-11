import * as process from "process";

import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
//import {ContextProvider} from './views/videoR/routes/RoomContext';
import reportWebVitals from "./reportWebVitals";
window.global = window;
window.process = process;
window.Buffer = [];
//import "bootstrap/dist/css/bootstrap.min.css";
const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

//strictmode
