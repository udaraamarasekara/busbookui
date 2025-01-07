import React, { useState, useEffect } from "react";
import "./DataTable.css";
import api from "./Api";
import { useLocation } from "react-router-dom";

const SeatsOfTrip = () => {
  const [data, setData] = useState(); // Initialize as empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const location = useLocation();
  const trip = location.state;
  useEffect(() => {
    const fetchBusses = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        if (!token) {
          throw new Error("Authentication token is missing");
        }
        api.defaults.headers.common["Authorization"] = token;
        const response = await api.get("/auth/ntc/booking?trip="+trip.trip);
        setData(response.data);
      } catch (err) {
        setError(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusses();
  }, []);

  return (
    <div className="table-container">
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      {!loading && !error && (
        <>
          <table>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Seat</th>
                <th>user</th>
                <th>trip id</th>

              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.seat}</td>
                    <td>{item.user}</td>
                    <td>{item.trip}</td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default SeatsOfTrip;
