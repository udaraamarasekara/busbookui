import React, { useState, useEffect } from "react";
import "./DataTable.css";
import api from "./Api";
import { useLocation } from "react-router-dom";
import styles from "./RegistrationForm.module.css";

const BookSeat = () => {
  const [data, setData] = useState(); // Initialize as empty array
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const location = useLocation();
  const [seats,setSeats] =useState([]);
  const[message,setMessage]= useState();
  const trip = location.state;
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        if (!token) {
          throw new Error("Authentication token is missing");
        }
        api.defaults.headers.common["Authorization"] = token;
        const response = await api.get("/auth/commutor/seat?trip="+trip.trip.id);
        setData(response.data);
      } catch (err) {
        setError(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSeats()
  }, []);
  const addToList=(seat)=>{
    
    setSeats([ ...seats, seat ])
    
  }
 const removeFromList=(s)=>{
  const up = seats.filter(seat=>seat==-s)
  setSeats(up)
 }
  const addBooking = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authentication token is missing");
      }
      api.defaults.headers.common["Authorization"] = token;
      const response = await api.post("/auth/commutor/book",{seats:seats,trip:trip.trip.id});
       setMessage(response.data)
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="table-container">
      {message &&  <p className="loading">{message}</p> }
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      {!loading && !error && (
        <div style={{display:'grid',gridTemplateColumns:'150px 150px 150px 150px 150px 150px '}}>
          {Array.from({ length: trip.trip.seatCount }).map((_, i) => (
            data?.some((item) => item.seat === i+1) ? (
                <div  style={{background:'red',color:"white",margin:12}} key={i}>
                Booked 
                 Seat {i + 1}
                </div> 
            ) : 
               seats.some((seat,)=>seat===i+1)
               ?<div  onClick={()=>removeFromList(i+1)} style={{background:'blue',color:"white",margin:12}} key={i}>
               Selected 
              Seat {i + 1}
            </div>:
            // Add a fallback if the condition is false\
                <div onClick={()=>addToList(i+1)} style={{background:'green',color:"white",margin:12}} key={i}>
                 Available 
                Seat {i + 1}
              </div>
          ))}
          
        </div>
      )}
            <button type="submit" onClick={()=>addBooking()} className={styles.button}>
              Book now
            </button>
    </div>
)};
  

export default BookSeat;
