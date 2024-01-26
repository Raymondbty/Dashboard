import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./style.css";
import "./styles.css";
import Register from "./Register";
import Login from "./Login";

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Login</Link>
        </nav>

        <Route path="/" exact component={Login} />
      </div>
    </Router>
  );
};

export default App;