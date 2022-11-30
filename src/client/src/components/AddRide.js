import { useState, useEffect } from 'react';
import axios from "axios";
import RideForm from './RideForm';

import '../register.css';


function AddRide() {
  return (
    <div className="rform">
      <div className="container">
        <RideForm />
      </div>
    </div>
  );
}

export default AddRide;