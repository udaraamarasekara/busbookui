import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import { BrowserRouter,  Routes, Route } from 'react-router-dom';
import Landing from './Landing';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="login" element={<Landing />}/>
        <Route path="registerCommutor" element={<Landing />}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App
