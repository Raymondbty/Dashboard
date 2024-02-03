import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./Register.css";
import "./Login.css";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Weather from "./Weather";
import Discord from "./Discord";
import Widgets from "./Widgets";
import YouTube from "./YouTube";
import { AppProvider } from './AppContext';

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/discord" element={<Discord />} />
          <Route path="/widgets" element={<Widgets />} />
          <Route path="/youtube" element={<YouTube />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;