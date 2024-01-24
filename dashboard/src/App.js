import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "./style.css";

function App() {
  return (
    <Router>
      <div className="app">
        <div className="login-form">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;