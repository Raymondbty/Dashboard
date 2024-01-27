import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./style.css";
import "./styles.css";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";  // Importez la nouvelle page Dashboard

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;