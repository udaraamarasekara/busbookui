import React, { useState } from "react";
import styles from "./RegistrationForm.module.css";
import api from "./Api";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const {role,setRole} = useAuth  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [responseMessage, setResponseMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/guest/login", formData);
      const { token } = response.data;
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role; 
      // Save the token in localStorage
     sessionStorage.setItem("authToken", token);
      api.defaults.headers.common["Authorization"] =token
     sessionStorage.setItem('role',userRole);
        //  setRole(userRole)
      setResponseMessage(`Success: ${response.data.message}`);
      navigate('/auth/'+userRole);
    } catch (error) {
      if (error.response) {
        setResponseMessage(`Error: ${error.response.data.message}`);
      } else {
        setResponseMessage("An error occurred. Please try again.");
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  return (
    <>
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputField}>
        <label className={styles.label} htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.inputField}>
        <label className={styles.label} htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>
      
      <button type="submit" className={styles.button}>
        Login
      </button>
    </form>
      {responseMessage && <p>{responseMessage}</p>}
      <Link styles={{backgroundColor:" #007bff"}} to='/register'>Register now</Link>
   </>   
  );
};

export default Login;
