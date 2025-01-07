import React, { useEffect, useState } from "react";
import styles from "./RegistrationForm.module.css";
import api from "./Api";
const AddBus = () => {
    const [busowners,setBusowners] = useState()  // Data from the loader
    const [routes,setRoutes] = useState()  // Data from the loader

    useEffect(() => {
      const fetchBusOwners = async () => {
        try {
          api.defaults.headers.common["Authorization"] =sessionStorage.getItem('authToken')
          const response = await api.get("/auth/ntc/bus-owners");
          setBusowners(response.data);
        } catch (error) {
          console.error("Failed to fetch bus owners:", error.response?.data || error.message);
        }
      };
      const fetchRoutes = async () => {
        try {
          api.defaults.headers.common["Authorization"] =sessionStorage.getItem('authToken')
          const response = await api.get("/auth/ntc/routes");
          setRoutes(response.data);
          console.log(routes)
        } catch (error) {
          console.error("Failed to fetch route :", error.response?.data || error.message);
        }
      };
      fetchBusOwners();
      fetchRoutes();
    }, []); // Runs only once
    

  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/ntc/bus", formData);
      setResponseMessage(`Success: ${response.data.message}`);
    } catch (error) {
      if (error.response) {
        setResponseMessage(`Error: ${error.response.data.message}`);
      } else {
        setResponseMessage("An error occurred. Please try again.");
      }
    }
  };
  const [formData, setFormData] = useState({
    permitNo: "",
    owner: "",
    busno: "",
    route: "",
    seatCount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  if (!busowners || busowners.length === 0) {
    return <p>Loading data...</p>;
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputField}>
          <label className={styles.label} htmlFor="permitNo">
            Permit No
          </label>
          <input
            type="text"
            id="permitNo"
            name="permitNo"
            value={formData.permitNo}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputField}>
  <label className={styles.label} htmlFor="routes">
    Routes
  </label>
  <select
    id="routes"
    name="route" // Ensure this matches the `formData` key
    value={formData.route}
    onChange={handleChange}
    className={styles.input}
    required
  >
    <option value="" disabled>
      Select a route
    </option>
    {routes && routes.length > 0 ? (
      routes.map((route) => (
        <option key={route.id} value={route.id}>
          {`${route.town_one} to ${route.town_two}`}
        </option>
      ))
    ) : (
      <option value="" disabled>
        No routes available
      </option>
    )}
  </select>
</div>

        
        <div className={styles.inputField}>
          <label className={styles.label} htmlFor="owner">
            Owner
          </label>
          <select
            id="owner"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
            className={styles.input}
            required
          >
            <option value="" disabled>
              Select an owner
            </option>
            {busowners?.map(owner => {
             return  <option key={owner.id} value={owner.id}>
               {owner.name}
             </option>
             })
            }
          </select>
        </div>
        <div className={styles.inputField}>
          <label className={styles.label} htmlFor="busno">
            Bus No
          </label>
          <input
            type="text"
            id="busno"
            name="busno"
            value={formData.busno}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.inputField}>
          <label className={styles.label} htmlFor="seatCount">
            Seat Count
          </label>
          <input
            id="seatCount"
            name="seatCount"
            type="number"
            min={0}
            value={formData.seatCount}
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

export default AddBus;
