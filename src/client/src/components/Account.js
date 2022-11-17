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
import AccountRide from './AccountRide';

function Account() {
    const { user, setUser } = useAuth();
    const [rideInfo, setRideInfo] = useState([]);


    useEffect(() => {
        axios.post("http://localhost:5000/auth/getAllRides", { user })
          .then((res) => setRideInfo(res.data)) 
          .catch((err) => console.log(err));
      })
    
    return (
        <div className="App">
            <div className="container">
            <h1>View Account: {user}</h1>
            <div className="list">
              {rideInfo.sort((a, b) => {
                  let d1 = Date.parse(a.date);
                  let d2 = Date.parse(b.date);
                  return d1 - d2;
                })
                .map(ride => <AccountRide
                  key={ride._id}
                  details={ride}
              />)}
            </div>
            </div>
        </div>
        );
}
    
export default Account;