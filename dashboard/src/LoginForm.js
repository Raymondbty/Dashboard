import React, { useState } from "react";
import { Link } from "react-router-dom";

function LoginForm() {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
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

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: "Invalid password" });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: "Invalid username" });
    }
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  return (
    <div>
      <div className="title">Login</div>
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
        Don't have an account? <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

export default LoginForm;