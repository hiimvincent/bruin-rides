import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import logo from '../blue.png';


import '../App.css';
import RideShareComponent from './RideShareComponent'

function Home() {

  const [text, setText] = useState("");
  const [rides, setRides] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/get-all-rides")
      .then((res) => setRides(res.data))
      .catch((err) => console.log(err));
  })


  const deleteRide = (_id) => {
    axios.post("http://localhost:5000/delete-ride", { _id })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }

  return (
<div className="App">
<div className="container"> 
</div>
<div className="homepageText">
  <p>
  <b>Bruin Rides</b> is a website where students from UCLA can coordinate sharing an Uber or Lyft ride.
  </p>
  <br></br>
  <p>
  Whether it's sightseers looking for fun in downtown LA, beach-goers headed to Santa Monica,
  or even Bruins hoping to get a better rate on their trip to LAX, 
  Bruin Rides is the central location for students to coordinate splitting fares.
  </p>
  <br></br>
  <hr></hr>
  <br></br>
  <p>
  <b>To get started</b> <Link to="/login">log in or sign up</Link> and search for your ride by: destination, date, and time. 
  </p>
  <br></br>
  <p>If you can't find a ride you want, take the initiative and make your own ride for others to join in on. 
  </p>
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

</div>
  );
}

export default Home;
