import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import logo from '../blue.png';
import bear from '../BruinBear.jpg';


import '../App.css';
import RideShareComponent from './RideShareComponent'

const imageStyle = {
  height: 400,
  width: 400,
  borderRadius: "25px",
  padding: "10px"
}

function Home() {

  return (
<div className="App">
<div className="container"> 
</div>
<center>
  <div className="row">
    <div className="homepageText largeCol">
      <p>
      <b>Bruin Rides</b> offers UCLA students a platform to coordinate carpooling.
      </p>
      <br></br>
      <p>
      Whether it's sightseers looking for fun in downtown LA, beach-goers headed to Santa Monica,
      or even Bruins hoping to get a better rate on their trip to LAX, 
      Bruin Rides is the central location for all UCLA students looking to split transportation costs.
      </p>
      <br></br>
      <p>Find rides created by fellow Bruins or create your own ride for others to join. </p> 
      <br></br>
      <hr></hr>
      <br></br>
      <p>
      <b>To get started</b> log in or sign up and search for rides by destination, date, or time. 
      </p>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      {/* <h3>Some Rides On Our Page Now</h3>
    </div>
    <div className="list" font-size="20px">
              {rides.map(ride => <RideShareComponent
                key={ride._id}
                remove={() => deleteRide(ride._id)}
                region={ride.region}
                destination={ride.destination}
                date={ride.date}
                time={ride.time}
                desc={ride.desc}
              />)} */}
    </div>
    <div className="smallCol">
      <img src ={bear} style={imageStyle}/>
    </div>
  </div>
</center>

</div>
  );
}

export default Home;
