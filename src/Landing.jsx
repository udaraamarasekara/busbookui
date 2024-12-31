import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Landing() {
  
  return (
   <>
    <Link to="/login">Login</Link>
    <Link to="/registerCommutor">Register</Link>
   </>
  );
}

export default Landing
