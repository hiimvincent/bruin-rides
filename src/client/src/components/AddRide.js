/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react';
import axios from "axios";

import '../App.css';
import RideComponent from './RideComponent'


function AddRide() {

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
        <h1>Add Ride</h1>
        <form onSubmit={addRide()}>
          <div className='form-group'>
            <label>From: </label>
            <input
              type="text"
              className="form-control"
              placeholder="Location"
              //value = TODO: retrieve "from" locations data from DB and display in drop-down menu
            />
            <br/>
            <label>To: </label>
            <input
              type="text"
              className="form-control"
              placeholder="Location"
              //value = TODO: retrieve "destination" locations data from DB and display in drop-down menu
            />
            <input 
              type="submit"
              className="form-control"
              placeholder="Add"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRide;