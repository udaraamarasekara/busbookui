import React, { useState, useEffect } from "react";
import "./DataTable.css";
import api from "./Api";
import { useNavigate } from "react-router-dom";

const MyBusses = () => {
  const [data, setData] = useState(); // Initialize as empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  const handleNavigate = (buss) => {
    sessionStorage.setItem('bus',buss.id);
    sessionStorage.setItem('route',buss.route);
    navigate("/myTrips", {state:{ bus: buss.id }});
  };
  const handleNavigateAddTrip = (buss) => {
    sessionStorage.setItem('route',buss.route);
    sessionStorage.setItem('bus',buss.id);
    sessionStorage.setItem('seats',buss.seatCount);

    navigate("/addTrip");
  };
  useEffect(() => {
    const fetchBusses = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        if (!token) {
          throw new Error("Authentication token is missing");
        }
        api.defaults.headers.common["Authorization"] = token;
        const response = await api.get("/auth/bus-owner/bus");
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
      
      {!loading && !error && (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Route</th>
                <th>Bus Number</th>
                <th>Permit Number</th>
                <th>Actions</th>

              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.route}</td>
                    <td>{item.busno}</td>
                    <td>{item.permitNo}</td>
                    <td > 
                    <button
                      style={{
                        backgroundColor: "#4CAF50", // Green background
                        color: "white", // White text
                        padding: "10px 20px", // Padding for size
                        fontSize: "16px", // Font size
                        border: "none", // Remove border
                        borderRadius: "5px", // Rounded corners
                        cursor: "pointer", // Pointer on hover
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Add shadow
                        transition: "background-color 0.3s ease", // Smooth hover effect
                      }}
                      onClick={()=>handleNavigate(item)}
                      onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")} // Hover effect
                      onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")} // Remove hover effect
                    >
                     View Trips
                    </button>
                    <button
                      style={{
                        backgroundColor: "#4CAF50", // Green background
                        color: "white", // White text
                        padding: "10px 20px", // Padding for size
                        fontSize: "16px", // Font size
                        border: "none", // Remove border
                        borderRadius: "5px", // Rounded corners
                        cursor: "pointer", // Pointer on hover
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Add shadow
                        transition: "background-color 0.3s ease", // Smooth hover effect
                      }}
                      onClick={()=>handleNavigateAddTrip(item)}
                      onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")} // Hover effect
                      onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")} // Remove hover effect
                    >
                     add trip
                    </button>
                    </td>

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

export default MyBusses;
