import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import Validate from "./ValidateSignUp";
import axios from "axios";

function Signup() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, SetErrors] = useState({});
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    SetErrors(Validate(values));
    if (
      errors.username === "" &&
      errors.email === "" &&
      errors.password === ""
    ) {
      axios
        .post("http://localhost:8001/signup", values)
        .then((res) => navigate("/"))
        .catch((err) => console.log(err));
    }
  };

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };
  return (
    <><div className="cc">
      <div className="container Ndcontainer">
        <div className="registration form">
          <header>Sign Up</header>
          <form action="" onSubmit={handleSubmit}>
            {errors.username && (
              <span className="prompt">{errors.username}</span>
            )}
            <input
              type="text"
              placeholder="Enter your username"
              name="username"
              onChange={handleInput}
            />
            {errors.email && <span className="prompt">{errors.email}</span>}

            <input
              type="text"
              placeholder="Enter your email"
              name="email"
              onChange={handleInput}
            />
            {errors.password && (
              <span className="prompt">{errors.password}</span>
            )}
            <input
              type="password"
              placeholder="Create a password"
              name="password"
              onChange={handleInput}
            />
            {errors.confirm_password && (
              <span className="prompt">{errors.confirm_password}</span>
            )}
            <input
              type="password"
              placeholder="Confirm your password"
              name="confirm_password"
              onChange={handleInput}
            />

            <input type="submit" className="button" value="Signup" />
          </form>
          <div className="switch">
            <span className="switch">
              Already have an account? <Link to="/">Login</Link>
            </span>
          </div>
        </div>
      </div></div>
    </>
  );
}

export default Signup;
