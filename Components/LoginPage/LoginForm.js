import React from "react";
import "./LoginForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
 const navigate =useNavigate();

  const handleError = (event) => {
    event.preventDefault();
    const error = validate();
    setErrorMessages(error);

    if (!error.email && !error.password){
      navigate("/Dashboard");
    }
  };



  const validate = () => {
    const error = {};

    if (!email) {
      error.email = "Email id is required!";
    } else if (email.toLowerCase()!== "sri@gmail.com") {
      error.email = "Invalid email id!";
    } else {
      error.email = "";
    }

    if (!password) {
      error.password = "Password is required!";
    } else if (password !== "AAaa11@@")
     {
      error.password ="Incorrect password!";
    } else {
      error.password = "";
    }

    return error;
  };

  return (
    <div className="body">
    <div className="loginContainer">
      <h1 className="heading">Employee Form</h1>

      <form onSubmit={handleError} autoComplete="off">
        <div className="inputBox">
          <div className="inputIcon">
            <input  className="inputField"  type="email" placeholder="Email id" onChange={(e) => setEmail(e.target.value)} autoComplete="off" />           
          </div>
          {errorMessages.email && (<div className="error">{errorMessages.email}</div> )}
        </div>

        <div className="inputBox">
          <div className="inputIcon">
            <input  className="inputField" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}autoComplete="off"/>            
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
