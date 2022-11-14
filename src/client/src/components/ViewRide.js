import React from "react";
import {
  BrowserRouter as Router,
  Link,
  useLocation
} from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";
import { Button } from '@mui/material';
import { useAuth } from "../Auth";


function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

function ViewRide() {
    let query = useQuery();
    const { user, setUser } = useAuth();
    const [rideID, setRideID] = useState(query.get("rideid"));
    const [rideInfo, setRideInfo] = useState([]);
    const [desc, setDesc] = useState("");

    useEffect(() => {
        axios.post("http://localhost:5000/get-ride-by-id", { rideID })
          .then((res) => setRideInfo(res.data)) 
          .catch((err) => console.log(err));
      })

    const updateRideDesc = () => {
        axios.post("http://localhost:5000/update-desc-by-id", { rideID, desc })
        .then((res) => setRideInfo(res.data)) 
        .catch((err) => console.log(err));
    }

    const updateRiders = () => {
      console.log(user);
      if (user && !rideInfo.riders.includes(user)) {
        let riders = rideInfo.riders.map((x) => x);
        riders.push(user);
        axios.post("http://localhost:5000/update-riders-by-id", { rideID, riders })
        .then((res) => setRideInfo(res.data)) 
        .catch((err) => console.log(err));


        axios.post("http://localhost:5000/auth/update-user-rides-by-id", { user, rideID })
        .then((res) => setRideInfo(res.data)) 
        .catch((err) => console.log(err));

      }
  }
    
    return (
        <div className="App">
            <div className="container">
            <h1>View Ride: {rideID}</h1>
            </div>

            <div><Button variant="contained" onClick={updateRiders}>Join Ride!</Button></div>
            <input
            type="text"
            placeholder='Update Ride Description...'
            value={desc}
            onChange={(e) => setDesc(e.target.value)} />
            <div><Button variant="contained" onClick={updateRideDesc}>Update Ride Desc!</Button></div>

            <div className="riders">Riders Joined: {rideInfo.riders ? rideInfo.riders.length : ""}</div>
            <div className="desc">{rideInfo.desc}</div>
            <div className="address">{rideInfo.address}</div>
            <div className="date">Ride Date: {rideInfo.date}</div>
            <div className="time">Time: {rideInfo.time}</div>
            <div className="grpSize">Group Size: {rideInfo.grpSize}</div>
        </div>
        );
}
    
export default ViewRide;