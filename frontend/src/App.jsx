import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPgae from './components/RegisterPage';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/register" element = {<RegisterPgae/>}/>
    </Routes>
    </BrowserRouter>

  )
}

export default App
