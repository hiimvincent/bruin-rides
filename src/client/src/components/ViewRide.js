import React from "react";
import {
  BrowserRouter as Router,
  Link,
  useLocation
} from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";
import { Button } from '@mui/material';



function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

function ViewRide() {
    let query = useQuery();
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
      const user_ID = 999;///TODO: REPLACE THIS WITH THE USER ID

      if (!rideInfo.riders.includes(user_ID)) {
        let riders = rideInfo.riders.map((x) => x);
        riders.push(user_ID);
        axios.post("http://localhost:5000/update-riders-by-id", { rideID, riders })
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