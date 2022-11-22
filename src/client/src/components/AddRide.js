import { useState, useEffect } from 'react';
import axios from "axios";


import '../App.css';
import RideComponent from './RideComponent'
import RideForm from './RideForm';

function AddRide() {
  return (
    <div className="App">
      <div className="container">
        <RideForm />
      </div>
    </div>
  );
}

export default AddRide;