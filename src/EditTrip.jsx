import React, { useState,useEffect} from "react";
import styles from "./RegistrationForm.module.css";
import api from "./Api";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const EditTrip = () => {
    const location=useLocation()
    const trip = location.state;
  const [loading,setLoading] = useState()
  const [formData, setFormData] = useState({
    start_at: "",
    end_at: "",
    start_from: "",
    bus:sessionStorage.getItem("bus"),
  });
 const [route,setRoute]=useState();
 const [busses,setBusses]=useState();
  
  useEffect(() => {
    const fetchBusses = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        if (!token) {
          throw new Error("Authentication token is missing");
        }
        api.defaults.headers.common["Authorization"] = token;
        const response = await api.get("/auth/bus-owner/bus");
        setBusses(response.data);
      } catch (err) {
        setError(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    const fetchRoutes = async () => {
        try {
          const routeId = sessionStorage.getItem('route')

          const token = sessionStorage.getItem("authToken");
          if (!token) {
            throw new Error("Authentication token is missing");
          }
          api.defaults.headers.common["Authorization"] = token;
          const response = await api.get("/auth/bus-owner/route?id="+routeId);
          setRoute(response.data[0]);
        } catch (err) {
          setError(err.response?.data || err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchRoutes();
    fetchBusses();
    console.log(trip)
  }, []);

  const [responseMessage, setResponseMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put("/auth/bus-owner/trip?trip="+trip.trip, formData);
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
        <label className={styles.label} htmlFor="start_at">start at</label>
        <input
          type="datetime-local"
          id="start_at"
          name="start_at"
          value={formData.start_at}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.inputField}>
        <label className={styles.label} htmlFor="end_at">end_at</label>
        <input
          type="datetime-local"
          id="end_at"
          name="end_at"
          value={formData.end_at}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>
      <div>
      <label className={styles.label} htmlFor="start_from">
      Select a direction (start from)
      </label>
        <select
          id="start_from"
          name="start_from" // Ensure this matches the `formData` key
          value={formData.start_from}
          onChange={handleChange}
          className={styles.input}
          required
        >
          <option value="" disabled>
          </option>
         
              <option key={route?.id+'1'} value={route?.town_one}>
                {route?.town_one}
              </option>
              <option key={route?.id+'2'} value={route?.town_two}>
                {route?.town_two}
              </option>
        </select>
      </div>
      <div>
      <label className={styles.label} htmlFor="bus">
      Select a bus
      </label>
        <select
          id="bus"
          name="bus" // Ensure this matches the `formData` key
          value={formData.bus}
          onChange={handleChange}
          className={styles.input}
          required
        >
          <option value="" disabled>
          </option>
          {busses?.map(bus=>{
           return <option key={bus?.id} value={bus?.id}>
            {bus?.busno}
            </option>
          })
             
            }
   
        </select>
      </div>
      <button type="submit" className={styles.button}>
        Register
      </button>
    </form>
      {responseMessage && <p>{responseMessage}</p>}
      <Link styles={{backgroundColor:" #007bff"}} to='/login'>Login now</Link>
   </>   
  );
};

export default EditTrip;
