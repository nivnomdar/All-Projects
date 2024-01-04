import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import MainLayout from "./Components/Layout/MainLayout/MainLayout";
import { BrowserRouter } from "react-router-dom";
import Home from "./Components/Layout/Home/Home";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  //   <BrowserRouter>
  //     <MainLayout />
  //   </BrowserRouter>

  <BrowserRouter>
    <Home />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
