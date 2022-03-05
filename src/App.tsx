import React from "react";

import "./App.scss";
import "./styles/global.scss";
import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
