import React from 'react'
import { Link, Navigate } from "react-router-dom";
import { Button }  from '@mui/material';
import { useState, useEffect } from 'react';
import { useAuth } from "../Auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CapacityBar from './CapacityBar';
import lax from '../lax.png'
import laxPic from "../components/background_photos/LAX.jpg"
import downtownPic from "../components/background_photos/LADowntown.jpg"
import hollywoodPic from "../components/background_photos/Hollywood.jpg"
import koreatownPic from "../components/background_photos/Koreatown.jpg"
import santamonicaPic from "../components/background_photos/SantaMonica.jpg"
import burbankPic from "../components/background_photos/Burbank.jpg"


function formatAMPM(date) {
    var hours = date.substring(0, 2)
    var minutes = date.substring(3, 5);
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

export default function ViewComponent({rideIDParam}) {
    const rideID = rideIDParam;
    const { user, setUser } = useAuth();
    const [rideInfo, setRideInfo] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const navigate = useNavigate();

    const listOfRiderInfo = () =>{
        const listItems = userInfo.map((r) =>
        r.firstName  || r.lastName ?
          <h3 className="h3RiderInfo">{r.firstName} {r.lastName} : {r.email}</h3>
        :
          <h3 className="h3RiderInfo">{r.email}</h3>
        );
        return <div>{listItems}</div>;
      }
      console.log(userInfo)
    
  const updateRiders = () => {
    console.log(rideInfo);
    if (user && !rideInfo.riders.includes(user) && rideInfo.riders.length < rideInfo.grpSize) {
        const rideID = rideInfo._id
        let riders = rideInfo.riders.map((x) => x);
        riders.push(user);
        axios.post("http://localhost:5000/update-riders-by-id", { rideID, riders })
        .then((res) => {
            setRideInfo(res.data)
            console.log(res.data)
            axios.post("http://localhost:5000/auth/update-user-rides-by-id", { user, rideID })
            .then((res) => {console.log(res.data)
                            console.log(rideInfo)}) 
            .catch((err) => console.log(err));
            
            const userIDs = res.data.riders;
            console.log(userIDs)
            axios.post("http://localhost:5000/auth/get-users-by-ids", { userIDs })
            .then((result) => setUserInfo(result.data))
            .catch((err) => console.log(err));
        }) 
        .catch((err) => console.log(err));

    } else if (user && rideInfo.riders.includes(user)) {
        const rideID = rideInfo._id
        let riders = rideInfo.riders.map((x) => x);
        riders = riders.filter(function(value, index, arr){ 
            return value != user;
        });
        axios.post("http://localhost:5000/update-riders-by-id", { rideID, riders })
        .then((res) => 
        {
            setRideInfo(res.data)
            console.log(res.data)
            axios.post("http://localhost:5000/auth/remove-user-rides-by-id", { user, rideID })
            .then((result) => {console.log(result.data)
                            console.log(rideInfo)}) 
            .catch((err) => console.log(err));

            const userIDs = res.data.riders;
            console.log(userIDs)
            axios.post("http://localhost:5000/auth/get-users-by-ids", { userIDs })
            .then((result) => setUserInfo(result.data))
            .catch((err) => console.log(err));

        }) 
        .catch((err) => console.log(err));
    }
  }
      
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
  }, [rideID])



    return (
        <div> 
            {rideInfo && rideInfo.time ?
            <div>
            <div className="viewComponent">
            <h2 className="viewRideLabel">{rideInfo.region}: {rideInfo.destination}</h2>
            <h2 className="viewRideLabelSmall">{rideInfo.date} {formatAMPM(rideInfo.time)}</h2>
            <br/> 
            <h2 className="viewRideLabelSmall">Description: {rideInfo.desc}</h2>  
            <br/> 
            <br/> 
            </div> 
            <br/> 


            <div className="viewComponent">
            <h2 className="viewRideLabel">Riders: {rideInfo.riders ? rideInfo.riders.length : "0"}/{rideInfo.grpSize}</h2>
            <br/> 
            {/* <h2 className="address">Ride Date: {rideInfo.date}</h2>
            <h2 className="address">Time: {rideInfo.time}</h2>
            <h2 className="address">Region: {rideInfo.region}</h2>
            <h2 className="address">Destination: {rideInfo.destination}</h2>
            <h2 className="address">Description: {rideInfo.desc}</h2> */}


            {
              user && rideInfo && rideInfo.riders && rideInfo.riders.includes(user) ?
              
              <div>
                {listOfRiderInfo()}
              </div> 
            :   
            <div>
              <h3 className="h3RiderInfo">Join ride to see other riders </h3>
            </div>
            }
            <br/>
            </div> 
            <br/> 


            <Button variant="contained" className="viewButton" onClick={updateRiders} disabled={rideInfo && rideInfo.riders && rideInfo.riders.length >= rideInfo.grpSize}>
        {(user && rideInfo && rideInfo.riders && rideInfo.riders.includes(user)) ? "Leave Ride" : 
          (rideInfo && rideInfo.riders && rideInfo.riders.length < rideInfo.grpSize ? "Join Ride" : "Ride Full")}
        </Button>
        <br/>
        <br/>

        </div>
        : null }
    </div>
    )
}