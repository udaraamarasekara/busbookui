import React, { useState, useEffect } from "react";
import styles from "./RegistrationForm.module.css";
import api from "./Api";
import { useNavigate } from "react-router-dom";

const SearchBus = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [formData, setFormData] = useState({
    start_from: "",
    end_from: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        if (!token) throw new Error("Authentication token is missing");
        api.defaults.headers.common["Authorization"] = token;
        const response = await api.get("/auth/commutor/routes");
        setRoutes(response.data);
      } catch (err) {
        setError(err.response?.data || err.message);
      }
    };
    fetchRoutes();
  }, []);

  const fetchBusses = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authentication token is missing");
      api.defaults.headers.common["Authorization"] = token;
      const response = await api.get("/auth/commutor/bus?start_from="+formData.start_from+"&&end_from="+formData.end_from);
      setData(response.data);
    } catch (err) {
      setError(err.response?.data || err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNavigateTrips = (trip) => {
    navigate("/searchTrips", { state: { trip: trip } });
  };

  return (
    <>
      <form className={styles.form} onSubmit={fetchBusses}>
        <div className={styles.inputField}>
          <label htmlFor="from_town">Start Town</label>
          <select
            id="from_town"
            name="start_from"
            value={formData.start_from}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select a start town
            </option>
            {routes?.map((town) => (
              <option key={town.id} value={town.town_one}>
                {town.town_one}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.inputField}>
          <label htmlFor="to_town">End Town</label>
          <select
            id="to_town"
            name="end_from"
            value={formData.end_from}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select an end town
            </option>
            {routes?.map((town) => (
              <option key={town.id} value={town.town_two}>
                {town.town_two}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Search</button>
      </form>

      <div className="table-container">
        {error && <div className="error-message">{error}</div>}
        {data.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Start at</th>
                <th>End at</th>
                <th>Bus Number</th>
                <th>Seats</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.start_at}</td>
                  <td>{item.end_at}</td>
                  <td>{item.busno}</td>
                  <td>{item.seatCount}</td>

                  <td>
                    <button
                      className="view-trips-btn"
                      onClick={() => handleNavigateTrips(item)}
                    >
                    Book seats
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-data">No data available.</div>
        )}
      </div>
    </>
  );
};

export default SearchBus;
