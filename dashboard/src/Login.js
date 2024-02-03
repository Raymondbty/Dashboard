import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: ""
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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // back todo
    const isFormValid = values.firstName && values.lastName && values.email;

    setValid(isFormValid);

    if (isFormValid) {
      setSubmitted(true);
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
            placeholder="Firt Name"
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