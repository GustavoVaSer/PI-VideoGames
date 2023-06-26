import React from "react";
import Home from "./views/Home/home";
import Detail from "./views/Detail/detail";
import Create from "./views/Create/create";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Home />
      <Detail />
      <Create />
    </div>
  );
}

export default App;
