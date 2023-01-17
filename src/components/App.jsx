import React from "react";
import { Routes, Route } from "react-router-dom"; 
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "./today/Home" ; 
import TopNav from "./today/TopNav";


function App() {
  
  return (
    <div className="App">
      <div className="Container">
      <TopNav />
        <Routes>
         <Route path="/" element={<Login />} />
         <Route path="/home" element={<Home />} />
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Signup />} />
        </Routes>
      </div>
     
    </div>
  );
}

export default App;
