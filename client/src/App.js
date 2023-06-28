import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/landingPage";
import Home from "./views/Home/home";
import Detail from "./components/Detail/detail";
import Create from "./views/Create/create";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route path="/home/:id" component={Detail} />
          <Route path="/create" component={Create} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
