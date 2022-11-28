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
import Burbank from "./background_photos/Burbank.jpg";
import Hollywood from "./background_photos/Hollywood.jpg";
import Koreatown from "./background_photos/Koreatown.jpg";
import LADowntown from "./background_photos/LADowntown.jpg";
import LAX from "./background_photos/LAX.jpg";
import SantaMonica from "./background_photos/SantaMonica.jpg";



const imageStyle = {
  height: 400,
  width: 400,
  borderRadius: "25px",
  padding: "10px"
}

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
  const [isLoggedIn, setIsLoggedIn] = useState(false)

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

  const updateRideDesc = () => {
      axios.post("http://localhost:5000/update-desc-by-id", { rideID, desc })
      .then((res) => setRideInfo(res.data)) 
      .catch((err) => console.log(err));
  }

  const updateRiders = () => {
    console.log(rideInfo);
    if (user && !rideInfo.riders.includes(user) && rideInfo.riders.length < rideInfo.grpSize) {
        const rideID = rideInfo._id
        let riders = rideInfo.riders.map((x) => x);
        riders.push(user);
        axios.post("http://localhost:5000/update-riders-by-id", { rideID, riders })
        .then((res) => console.log(res.data)) 
        .catch((err) => console.log(err));

        axios.post("http://localhost:5000/auth/update-user-rides-by-id", { user, rideID })
        .then((res) => console.log(res.data)) 
        .catch((err) => console.log(err));
    } else if (user && rideInfo.riders.includes(user)) {
        const rideID = rideInfo._id
        let riders = rideInfo.riders.map((x) => x);
        riders = riders.filter(function(value, index, arr){ 
            return value != user;
        });
        axios.post("http://localhost:5000/update-riders-by-id", { rideID, riders })
        .then((res) => console.log(res.data)) 
        .catch((err) => console.log(err));

        axios.post("http://localhost:5000/auth/remove-user-rides-by-id", { user, rideID })
        .then((res) => console.log(res.data)) 
        .catch((err) => console.log(err));
    }
  }
  
  const listOfRiderInfo = () =>{
    const listItems = userInfo.map((r) =>
    r.firstName  || r.lastName ?
      <h3 className="h3RiderInfo">{r.firstName} {r.lastName} : {r.email}</h3>
    :
      <h3 className="h3RiderInfo">{r.email}</h3>
    );
    return <div>{listItems}</div>;
  }

  const getBackgroundImage = () =>{
    const locations = ["LAX", "Downtown", "Hollywood", "Koreatown", "Santa Monica", "Burbank"];
    switch (rideInfo.region){
      case locations[0]:
        return LAX;
      case locations[1]:
          return LADowntown;
      case locations[2]:
            return Hollywood;
      case locations[3]:
        return Koreatown;
      case locations[4]:
        return SantaMonica;
      case locations[5]:
        return Burbank;
    }

  }

  return (
    <div className="App">
        <div className="container">
          <h1>Ride ID: {rideID}</h1>
        </div>

        <Button variant="contained" onClick={updateRiders}>
          {(user && rideInfo && rideInfo.riders && rideInfo.riders.includes(user)) ? "Leave Ride" : "Join Ride"}
        </Button>
        <br/><br/>
  <center>
  <div className="row">
    <div className="column">
    <h2 className="riders">Riders: {rideInfo.riders ? rideInfo.riders.length : "0"}/{rideInfo.grpSize}</h2>
        <br/> 
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
        <h2 className="date">Ride Date: {rideInfo.date}</h2>
        <h2 className="time">Time: {rideInfo.time}</h2>
        <br/>
        <h2 className="address">Region: {rideInfo.region}</h2>
        <h2 className="address">{rideInfo.address}</h2>
        <h2 className="address">Destination: {rideInfo.destination}</h2>
        <br/>
        <h2 className="desc">Description: {rideInfo.desc}</h2>
            </div>
    <div className="column">
      <img src ={getBackgroundImage()} style={imageStyle}/>
    </div>
  </div>
</center>



    </div>
  );

}
    
export default ViewRide;