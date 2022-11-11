import React from 'react'
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './Components/Footer';
import Signup from './Components/SignupPage';
import Login from './Components/LoginPage';
import Repository from './Components/Repository';
import 'bootstrap/dist/css/bootstrap.min.css';
import VerifyEmail from './Components/VerifyEmail';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>}></Route>
          <Route path="/Register" element={<h1>Registration Page</h1>}></Route>
          <Route path="/Login" element={<Login></Login>}></Route>
          <Route path="/Signup" element={<Signup></Signup>}></Route>
          <Route path="/Repository" element={<Repository></Repository>}></Route>
          <Route path="/VerifyEmail/:id" element={<VerifyEmail></VerifyEmail>}></Route>
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  );
}

export default App;
