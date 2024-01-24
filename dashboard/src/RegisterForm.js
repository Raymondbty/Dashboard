import React, { useState } from "react";
import { Link } from "react-router-dom";

function RegisterForm() {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Simulating a database for demonstration purposes
    const database = [
      {
        username: "user1",
        password: "pass1"
      },
      {
        username: "user2",
        password: "pass2"
      }
    ];

    // Check if username already exists
    if (database.some((user) => user.username === uname.value)) {
      setErrorMessages({ name: "uname", message: "Username already exists" });
    } else {
      // Add new user to the database
      database.push({ username: uname.value, password: pass.value });
      setIsSubmitted(true);
    }
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  return (
    <div>
      <div className="title">Register</div>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
      <div>
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default RegisterForm;