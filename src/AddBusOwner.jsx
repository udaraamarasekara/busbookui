import React, { useState } from "react";
import styles from "./RegistrationForm.module.css";
import api from "./Api";
import { Link } from "react-router-dom";
const AddBusOwner = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [responseMessage, setResponseMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/ntc/register-bus-owner", formData);
      setResponseMessage(`Success: ${response.data.message}`);
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
        <label className={styles.label} htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>

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
        Register
      </button>
    </form>
      {responseMessage && <p>{responseMessage}</p>}
   </>   
  );
};

export default AddBusOwner;
