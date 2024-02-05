import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    setValues((values) => ({
      ...values,
      [name]: value
    }));
  };

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const isFormValid = values.email && values.firstName && values.lastName && values.password;
  
    setValid(isFormValid);
  
    if (isFormValid) {
      try {
        const response = await fetch("http://localhost:3001/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
  
        if (response.ok) {
          console.log("Login successful");
          setSubmitted(true);
        } else {
          console.error("Login failed");
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    }
  };

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        {submitted && valid && (
          <div className="success-message">
            <h3>
              {" "}
              Welcome {values.firstName} {values.lastName}{" "}
            </h3>
            <div> Your registration was successful! </div>
            <Link to="/dashboard" className="form-field">
              Go to Dashboard
            </Link>
          </div>
        )}
        {!valid && (
          <input
            className="form-field"
            type="text"
            placeholder="First Name"
            name="firstName"
            value={values.firstName}
            onChange={handleInputChange}
          />
        )}
        {submitted && !values.firstName && (
          <span id="first-name-error">Please enter a first name</span>
        )}
        {!valid && (
          <input
            className="form-field"
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={values.lastName}
            onChange={handleInputChange}
          />
        )}
        {submitted && !values.lastName && (
          <span id="last-name-error">Please enter a last name</span>
        )}
        {!valid && (
          <input
            className="form-field"
            type="email"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
          />
        )}
        {submitted && !values.email && (
          <span id="email-error">Please enter an email address</span>
        )}
        {!valid && (
          <input
            className="form-field"
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleInputChange}
          />
        )}
        {submitted && !values.password && (
          <span id="password-error">Please enter a password</span>
        )}
        {!valid && (
          <button className="login-button" type="submit">
            Login
          </button>
        )}
        {!valid && (
          <Link to="/register" className="form-field" style={{ marginLeft: '100px' }}>
            Go to Register
          </Link>
        )}
      </form>
    </div>
  );
}
