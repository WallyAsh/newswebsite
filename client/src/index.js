import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./style/index.css";
import { HashRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
    <HashRouter>
      <App />
    </HashRouter>,
  document.getElementById("root")
);