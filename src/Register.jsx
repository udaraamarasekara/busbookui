
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
function Register() {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
        const [formData, setFormData] = useState({
          name: '',
          email: '',
          password: '',
          passwordConfirmation: '',
        });
      // Handle form submission
      const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload on form submission
    
        try {
          const response = await axios.post('http://localhost:5000/api/submit', formData);
          alert(response.data.message); // Assuming API sends a 'message'
        } catch (error) {
          if (error.response) {
            // Server error
            alert(`Error: ${error.response.data.message}`);
          } else {
            // Network or other error
            alert('Error submitting the form. Please try again.');
          }
        }
      };
return (<>
<h1>BusBook</h1>
<div className="card">
   <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>
      <button type="submit">Submit</button>
   </form>
</div>
</>);
}