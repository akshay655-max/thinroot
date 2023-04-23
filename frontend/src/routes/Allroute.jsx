import React from 'react'
import {Routes,Route} from "react-router-dom";
import ForgotPassword from '../pages/ForgotPassword';
import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ResetPassword from '../pages/ResetPassword';
import SecurityQuestion from '../pages/SecurityQuestion';

const Allroute = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/forgot" element={<ForgotPassword/>}/>
        <Route path="/security_question" element={<SecurityQuestion/>}/>
        <Route path="/reset_password" element={<ResetPassword/>}/>
    </Routes>
    </>
  )
}

export default Allroute;