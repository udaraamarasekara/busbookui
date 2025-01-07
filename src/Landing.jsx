import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Landing() {
  
  return (
   <div style={{display:'flex',flexDirection:'row',width:'100vw',height:'100vh', justifyContent:'center',alignItems:'center'}}>
    <Link className='Button' to="/login">Login</Link>
    <Link className='Button' to="/registerCommutor">Register</Link>
   </div>
  );
}

export default Landing
