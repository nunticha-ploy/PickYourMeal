import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPgae from './components/RegisterPage';
import LogInPage from './components/LoginPage';
import OTPVerifyPage from './components/OTPVerifyPage';
import Home from './components/Home';
import SearchMenuItemPage from './components/SearchMenuPage';
import MenuItemDetailPage from './components/MenuItemDetailPage';
import RandomMenuPage from './components/RandomMenuPage';
import MyBookmarkPage from './components/MyBookmarkPage';

function App() {

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element = {<Home/>}/>
      <Route path="/register" element = {<RegisterPgae/>}/>
      <Route path="/login" element = {<LogInPage/>}/>
      <Route path="/verify-otp" element = {<OTPVerifyPage/>}/>
      <Route path="/search-menu" element= {<SearchMenuItemPage/>}/>
      <Route path="/menu-detail" element= {<MenuItemDetailPage/>}/>
      <Route path="/random-menu" element= {<RandomMenuPage/>}/>
      <Route path="/mybookmark" element= {<MyBookmarkPage/>}/>

    </Routes>
    </BrowserRouter>

  )
}

export default App
