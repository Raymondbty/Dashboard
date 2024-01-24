// AppRouter.js
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import Register from "./Register";

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/" component={App} />
      </Switch>
    </Router>
  );
}

export default AppRouter;