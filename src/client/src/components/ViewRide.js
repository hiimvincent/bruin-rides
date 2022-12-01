import React from "react";
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  useLocation
} from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Auth";
import ViewComponent from './ViewComponent'

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
  padding: "10px",
  marginRight: "50px",
}

//Hook to grab path url parameter
function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

function ViewRide() {
  let query = useQuery();
  //Initialize ride ID state with query parameter
  const [rideID, setRideID] = useState(query.get("rideid"));
  const [rideInfo, setRideInfo] = useState([]);

  //Upon page loading, get rides corresponding to query parameter ride ID
  useEffect(() => {
    axios.post("http://localhost:5000/get-ride-by-id", { rideID })
      .then((res) => {
        setRideInfo(res.data)
      }) 
      .catch((err) => console.log(err));
  }, [rideID])

  //Determine which background image to render
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

  //Render page with region image and ViewComponent from ride details
  return (
    <div className="App">
      <center className="viewRideContent">
        <div className="row">
          <div className="smallCol">
            <img src ={getBackgroundImage()} style={imageStyle}/>
          </div>
          <div className="largeCol">
            <ViewComponent rideIDParam = {rideID}/>
          </div>
        </div>
        <br/><br/>
      </center>
    </div>
  );
}
    
export default ViewRide;