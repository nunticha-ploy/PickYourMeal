import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPgae from './components/RegisterPage';
import LogInPage from './components/LoginPage';
import OTPVerifyPage from './components/OTPVerifyPage';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/register" element = {<RegisterPgae/>}/>
      <Route path="/login" element = {<LogInPage/>}/>
      <Route path="/verify-otp" element = {<OTPVerifyPage/>}/>
    </Routes>
    </BrowserRouter>

  )
}

export default App
