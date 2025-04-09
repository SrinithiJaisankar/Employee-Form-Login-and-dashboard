import React from "react";
import "./LoginForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();

  const handleError = async (event) => {
    event.preventDefault();
    let errors = {};

    if (!email.trim()) {
      errors.email = "Email is required!";
    }
    if (!password.trim()) {
      errors.password = "Password is required!";

    }

    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      return;
    }

     
       await fetch("http://localhost:5000/login", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "post",
        body:JSON.stringify ({ email, password }),
        
      })
  
        .then(async (response) => {
          const data = await response.json();
          console.log("Response data:", data);

        setErrorMessages({email:data.email, password:data.password});
        
        
      if (response.status === 200) {
        navigate("/Dashboard");
      } 
      })
      .catch(error => {
        // Handle any errors
        console.error("Login Error:", error);
      // console.log(error.response.data.error);

      if (error.response && error.response.data) {
        setErrorMessages(error.response.data);
      } else  {
        setErrorMessages({ login: "Server error. Try again later!" });
      }

  });   
     
};

  return (
    <div className="body">
      <div className="loginContainer">
        <h1 className="heading">Employee Form</h1>

        <form onSubmit={handleError} autoComplete="off">
          <div className="inputBox">
            <div className="inputIcon">
              <input
                className="inputField"
                type="email"
                placeholder="Email id"
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
            </div>
            {errorMessages.email && (
              <div className="error">{errorMessages.email}</div>
              
            )}
          </div>

          <div className="inputBox">
            <div className="inputIcon">
              <input
                className="inputField"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
              />
            </div>
            {errorMessages.password && (
              <div className="error">{errorMessages.password}</div>
            )}
          </div>

          <button type="submit" className="loginBtn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
