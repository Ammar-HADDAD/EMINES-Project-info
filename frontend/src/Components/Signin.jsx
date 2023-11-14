import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import Validate from "./ValidateLogin";
import axios from "axios";




function Signin() {
  const [values, setValues] = useState({
    email: [""],
    password: [""],
  });
  const [errors, SetErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    SetErrors(Validate(values));
    if (errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:8001/signin", values)
        .then((res) => {
          if (res.data == "Success") {
            navigate("/dashboard");
          } else {
            alert("Invalid email or password");
          }
        })
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
    <>
      <div className="container Ndcontainer">
        <div className="login form">
          <header>Login</header>
          <form action="" onSubmit={handleSubmit}>
            {errors.email && <span className="prompt">{errors.email}</span>}
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              onChange={handleInput}
            />
            {errors.password && (
              <span className="prompt">{errors.password}</span>
            )}
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleInput}
            />
            <a href="">Forgot password?</a>
            <input type="submit" className="button" value="Login" />
          </form>
          <div className="switch">
            <span className="switch">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
