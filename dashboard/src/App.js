import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./style.css";
import "./styles.css";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Weather from "./Weather";
import Discord from "./Discord";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/discord" element={<Discord />} />
      </Routes>
    </Router>
  );
};

export default App;