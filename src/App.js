// import React from "react";
// import "./App.css"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";

import  LoginForm  from "./Components/LoginPage/LoginForm";
import DashBoard from "./Components/DashBoardPage/DashBoard";
import {BrowserRouter, Routes, Route} from "react-router-dom"





function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginForm/>} />
      <Route path="/DashBoard" element={< DashBoard />} />
    </Routes>
    </BrowserRouter>

  );
}

export default App;
