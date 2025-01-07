import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Ntc() {
    const gridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
        gap: "10px",
        padding: "20px",
      };
    
      const buttonStyle = {
        padding: "10px",
        fontSize: "16px",
        backgroundColor: "#007BFF",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      };
  return (
    <div style={gridStyle}>   
     <Link style={buttonStyle}  to="/addbus">Add bus </Link>
     <Link style={buttonStyle} to="/addbusowner">Add bus owner</Link>
     <Link style={buttonStyle} to="/allBusses">View Busses</Link>

   </div>
  );
}

export default Ntc
