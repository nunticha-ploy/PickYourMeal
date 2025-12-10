import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPgae from './user/RegisterPage';
import LogInPage from './user/LoginPage';
import OTPVerifyPage from './user/OTPVerifyPage';
import Home from './components/Home';
import SearchMenuItemPage from './menu/SearchMenuPage';
import MenuItemDetailPage from './menu/MenuItemDetailPage';
import RandomMenuPage from './menu/RandomMenuPage';
import MyBookmarkPage from './bookmark/MyBookmarkPage';
import CreateBookmarkPage from './Bookmark/CreateBookmarkPage';

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
      <Route path="/create-bookmark" element= {<CreateBookmarkPage/>}/>
    </Routes>
    </BrowserRouter>

  )
}

export default App
