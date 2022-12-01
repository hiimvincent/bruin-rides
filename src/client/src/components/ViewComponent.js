import React from 'react'
import { Button }  from '@mui/material';
import { useState, useEffect } from 'react';
import { useAuth } from "../Auth";
import axios from "axios";


//Function to process time stored in the database
function formatAMPM(date) {
    var hours = date.substring(0, 2)
    var minutes = date.substring(3, 5);
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '00' should be '12'
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

export default function ViewComponent({rideIDParam}) {
  const rideID = rideIDParam;
  const { user, setUser } = useAuth();
  const [rideInfo, setRideInfo] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  //Format list of riders and contact details
  const listOfRiderInfo = () =>{
      const listItems = userInfo.map((r) =>
      r.firstName  || r.lastName ?
        <h3 className="h3RiderInfo">{r.firstName} {r.lastName} : {r.email}</h3>
      :
        <h3 className="h3RiderInfo">{r.email}</h3>
      );
      return <div>{listItems}</div>;
    }

  //Function to update riders upon joining or leaving a ride
  const updateRiders = () => {
    //If the user is authenticated, and has not joined ride, and ride has space, join the ride
    if (user && !rideInfo.riders.includes(user) && rideInfo.riders.length < rideInfo.grpSize) {
      //Prep database endpoint data and add user to ride entry
      const rideID = rideInfo._id
      let riders = rideInfo.riders.map((x) => x);
      riders.push(user);
      axios.post("http://localhost:5000/update-riders-by-id", { rideID, riders })
      .then((res) => {
          setRideInfo(res.data)
          axios.post("http://localhost:5000/auth/update-user-rides-by-id", { user, rideID })
          .then((res) => {console.log(res.data)
                          console.log(rideInfo)}) 
          .catch((err) => console.log(err));
          
          //Add ride ID to user entry
          const userIDs = res.data.riders;
          axios.post("http://localhost:5000/auth/get-users-by-ids", { userIDs })
          .then((result) => setUserInfo(result.data))
          .catch((err) => console.log(err));
      }) 
      .catch((err) => console.log(err));
    } 
    //If the user has already joined the ride, 
    else if (user && rideInfo.riders.includes(user)) {
      //Prep database endpoint data
      const rideID = rideInfo._id
      let riders = rideInfo.riders.map((x) => x);
      riders = riders.filter(function(value, index, arr){ 
          return value != user;
      });

      //Update ride to remove current user
      axios.post("http://localhost:5000/update-riders-by-id", { rideID, riders })
      .then((res) => 
      {
        setRideInfo(res.data)
        
        //remove ride from user database entry
        axios.post("http://localhost:5000/auth/remove-user-rides-by-id", { user, rideID })
        .then((result) => {console.log(result.data)
                        console.log(rideInfo)}) 
        .catch((err) => console.log(err));

        //Get latest version of users on the ride (after current user has left)
        const userIDs = res.data.riders;
        axios.post("http://localhost:5000/auth/get-users-by-ids", { userIDs })
        .then((result) => setUserInfo(result.data))
        .catch((err) => console.log(err));
      }) 
      .catch((err) => console.log(err));
    }
  }
      
  //Upon page load, get the ride details and users for the current ride and save in the state
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


    //Render ViewComponent as ride details and rider details, the last of which only renders when joined. Render join/leave button.
    return (
        <div> 
          {rideInfo && rideInfo.time ?
            <div>
              <br/> 
              <br/> 
              <div className="viewComponent">
              <h2 className="viewRideLabel">{rideInfo.region}: {rideInfo.destination}</h2>
              <h2 className="viewRideLabelSmall">{rideInfo.date} {formatAMPM(rideInfo.time)}</h2>
              <br/> 
              <h2 className="viewRideLabelSmall">Description: {rideInfo.desc}</h2>  
              <br/> 
              <br/> 
            </div> 
            <br/> 
            <br/> 

            <div className="viewComponent">
            <h2 className="viewRideLabel">Riders: {rideInfo.riders ? rideInfo.riders.length : "0"}/{rideInfo.grpSize}</h2>
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
            </div> 
            <br/> 
            <br/> 

            <Button variant="contained" className="viewButton" onClick={updateRiders} disabled={rideInfo && rideInfo.riders && rideInfo.riders.length >= rideInfo.grpSize && !rideInfo.riders.includes(user)}>
              {(user && rideInfo && rideInfo.riders && rideInfo.riders.includes(user)) ? "Leave Ride" : 
                (rideInfo && rideInfo.riders && rideInfo.riders.length < rideInfo.grpSize ? "Join Ride" : "Ride Full")}
            </Button>
          <br/>
          <br/>
        </div>
        : null
      }
    </div>
  )
}