import './App.css';
import React from 'react';
import Profilepage from './profilepage.js'
import MainLogin from './loginpage.js'
import Mainpage from './mainpage.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreatePost from './CreatePost.jsx'

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<MainLogin />} />
      <Route path="/profile" element={<Profilepage />} />
      <Route path="/home" element={<Mainpage />} />
      <Route path= "/createpost" element = {<CreatePost/>} />
      
    </Routes>
  </Router>
  );
}

export default App;

//