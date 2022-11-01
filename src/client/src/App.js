import { useState, useEffect } from 'react';
import axios from "axios";

import './App.css';
import RideComponent from './components/RideComponent'

function App() {

  const [text, setText] = useState("");
  const [rides, setRides] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/get-rides")
      .then((res) => setRides(res.data))
      .catch((err) => console.log(err));
  })

  const addRide = () => {
    axios.post("http://localhost:5000/save-ride", { text })
      .then((res) => {
        console.log(res.data);
        setText("");
      })
      .catch((err) => console.log(err));
  }

  const deleteRide = (_id) => {
    axios.post("http://localhost:5000/delete-ride", { _id })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }

  return (
    <div className="App">
      <div className="container">
        <h1>Bruin Rides</h1>
        <div className="top">
          <input
            type="text"
            placeholder='Ride info...'
            value={text}
            onChange={(e) => setText(e.target.value)} />
          <div className="add"
            onClick={addRide}>{"Add"}</div>
        </div>

        <div className="list">
          {rides.map(ride => <RideComponent
            key={ride._id}
            text={ride.text}
            remove={() => deleteRide(ride._id)}/>)}
        </div>

      </div>
    </div>
  );
}

export default App;