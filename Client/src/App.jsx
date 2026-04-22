import React from 'react'
import Home from './pages/Home'
import Register from './components/Register'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'

function App() {
  return (
  <BrowserRouter>
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
      <Footer/>

    </div>
  </BrowserRouter>
);
}

export default App