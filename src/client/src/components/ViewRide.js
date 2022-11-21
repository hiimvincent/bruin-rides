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
    const [userInfo, setUserInfo] = useState([]);
    const [rideInfo, setRideInfo] = useState([]);
    const [desc, setDesc] = useState("");

    useEffect(() => {
        axios.post("http://localhost:5000/get-ride-by-id", { rideID })
          .then((res) => {
            setRideInfo(res.data)
            const userIDs = res.data.riders;
            console.log(userIDs)
            axios.post("http://localhost:5000/auth/get-users-by-ids", { userIDs })
            .then((result) => setUserInfo(result.data))
            .catch((err) => console.log(err));
          }) 
          .catch((err) => console.log(err));
      })

    const updateRideDesc = () => {
        axios.post("http://localhost:5000/update-desc-by-id", { rideID, desc })
        .then((res) => setRideInfo(res.data)) 
        .catch((err) => console.log(err));
    }

    const updateRiders = () => {
      console.log(user);
      if (user && !rideInfo.riders.includes(user) && rideInfo.riders.length < rideInfo.grpSize) {
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
    
    const listOfRiderInfo = () =>{
      const listItems = userInfo.map((r) =>
        <li>{r.email}</li>
      );
      return <ul>{listItems}</ul>;
    }
    return (
        <div className="App">
            <div className="container">
            <h1>Ride ID: {rideID}</h1>
            </div>
            <div><Button variant="contained" onClick={updateRiders}>Join Ride!</Button></div>          
              {user && rideInfo && rideInfo.riders && user == rideInfo.riders[0] ? 
              
              <div>
                <br/><br/> 
                <h2>You Own This Ride</h2>
                <input
              type="text"
              placeholder='Update Ride Description...'
              value={desc}
              onChange={(e) => setDesc(e.target.value)} />
              <div><Button variant="contained" onClick={updateRideDesc}>Update Ride Desc!</Button></div></div> 
            : <div/>}
            <br/><br/>

            <h2 className="riders">Riders: {rideInfo.riders ? rideInfo.riders.length : "0"}/{rideInfo.grpSize}</h2> 
            {
              user && rideInfo && rideInfo.riders && rideInfo.riders.includes(user) ?
              
              <div>
                {listOfRiderInfo()}
              </div> 
            :   
            <div>
              <h3>Join ride to see other riders </h3>
            </div>
            }
            <br/>
            <h2 className="date">Ride Date: {rideInfo.date}</h2>
            <h2 className="time">Time: {rideInfo.time}</h2>
            <br/>
            <h2 className="address">Region: {rideInfo.region}</h2>
            <h2 className="address">{rideInfo.address}</h2>
            <h2 className="address">Destination: {rideInfo.destination}</h2>
            <br/>
            <h2 className="desc">Description: {rideInfo.desc}</h2>
        </div>
        );
}
    
export default ViewRide;