import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,  Routes, Route } from 'react-router-dom';
import Landing from './Landing';
import Register from './Register';
import Login from './Login';
import AddBus from './AddBus';
import AddBusOwner from './AddBusOwner'
import { AuthProvider } from "./AuthContext";
import Commutor from './Commutor';
import Ntc from './Ntc';
import GetAllBusses from './GetAllBusses';
import TripsOfABus from './TripsOfABus';
import BusOwner from './BusOwner';
import AddTrip from './AddTrip';
import MyBusses from './MyBusses';
import MyTrips from './MyTrips';
import EditTrip from './EditTrip';
import SearchBus from './SearchBus';
import BookSeat from './BookSeats';
import MyBookings from './MyBookings';
import BusOwnerBookings from './BusOwnerBookings';
import AddNtc from './AddNtc';
import SeatsOfTrip from './SeatsOfTrip';
function App() {
  
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="login" element={<Login />}/>
        <Route path="register" element={<Register />}/>
        <Route path='auth' element={<Commutor/>}>
            <Route path="ntc" element={<Ntc />}/>
            <Route path='bus-owner' element={<BusOwner/>}/>
            <Route path='admin' element={<AddNtc/>}/>
            <Route path='commuter' element={<></>}/>
        </Route>
        <Route path='addbus' element={<AddBus/>}/>
        <Route path='addbusowner' element={<AddBusOwner/>}/>
        <Route path='allBusses' element={<GetAllBusses/>}/>
        <Route path='tripsOfABus' element={<TripsOfABus/>}/>
        <Route path='addTrip' element={<AddTrip/>}/>
        <Route path='myBusses' element={<MyBusses/>}/>
        <Route path='myTrips' element={<MyTrips/>}/>
        <Route path='editTrip' element={<EditTrip/>}/>
        <Route path='SearchBus' element={<SearchBus/>}/>
        <Route path='searchTrips' element={<BookSeat/>}/>
        <Route path='MyBookings' element={<MyBookings/>}/>
        <Route path='BusOwnerBookings' element={<BusOwnerBookings/>}/>
        <Route path='seatsOfTrip' element={<SeatsOfTrip/>}/>

      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App
