import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
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
  const [redirected, setRedirected] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
  
      if (response.ok) {
        setValid(true);
        setSubmitted(true);
        setRedirected(true);
  //      navigate("/login");
      } else {
        const data = await response.json();
        console.error("Registration failed:", data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };
  

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit}>
      {submitted && valid && !redirected && (
          <div className="success-message">
            <h3>
              Welcome {values.firstName} {values.lastName}
            </h3>
            <div>Your registration was successful!</div>
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
          <input
            className="form-field"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleInputChange}
          />
        )}

        {submitted &&
          values.password &&
          values.confirmPassword &&
          values.password !== values.confirmPassword && (
            <span id="password-match-error">Passwords do not match</span>
          )}

        {submitted && !values.confirmPassword && (
          <span id="confirm-password-error">Please confirm your password</span>
        )}

        {!valid && (
          <button className="form-field" type="submit">
            Register
          </button>
        )}

        {!valid && (
          <Link to="/" className="form-field" style={{ marginLeft: '100px' }}>
            Go to Login
          </Link>
        )}
      </form>
    </div>
  );
};

export default Register;