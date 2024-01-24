// Register.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
  // Ajoutez le code de votre formulaire d'inscription ici

  return (
    <div className="register-page">
      <div className="login-form">
        <div className="title">Register</div>
        {/* Ajoutez votre formulaire d'inscription ici */}
        <div className="button-container">
          <input type="submit" value="Register" />
        </div>
        <div className="login-link">
          Already have an account? <Link to="/">Sign In</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
