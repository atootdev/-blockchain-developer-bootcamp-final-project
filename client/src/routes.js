import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Mint from "./pages/Mint";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/user/:address" component={Profile} />
        <Route path="/mint" component={Mint} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;