import { useState, useEffect } from 'react';
import axios from "axios";
import logo from '../blue.png';

import '../App.css';
import RideShareComponent from './RideShareComponent'

function Home() {

  const [text, setText] = useState("");
  const [rides, setRides] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/get-rides")
      .then((res) => setRides(res.data))
      .catch((err) => console.log(err));
  })

  // const addRide = () => {
  //   axios.post("http://localhost:5000/save-ride", { text })
  //     .then((res) => {
  //       console.log(res.data);
  //       setText("");
  //     })
  //     .catch((err) => console.log(err));
  // }

  const deleteRide = (_id) => {
    axios.post("http://localhost:5000/delete-ride", { _id })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }

  return (
    <div className="App">
      <div className="container"> 
        <h2> <img src={logo} alt="Logo" width="90" /> Bruin Rides </h2>
        {/* <div className="top">
          <input
            type="text"
            placeholder='Ride info...'
            value={text}
            onChange={(e) => setText(e.target.value)} />
          <div className="add"
            onClick={addRide}>{"Add"}</div>
        </div> */}

        <div className="list">
          {rides.map(ride => <RideShareComponent
            key={ride._id}
            remove={() => deleteRide(ride._id)}
            region={ride.region}
            destination={ride.destination}
            date={ride.date}
            time={ride.time}
            desc={ride.desc}
          />)}
        </div>

      </div>
    </div>
  );
}

export default Home;