import { useState, useEffect } from 'react';
import axios from "axios";
import Register from './Register';

import '../App.css';


function SignUp() {
  return (
    <div className="App">
      <div className="container">
        <Register />
      </div>
    </div>
  );
}

export default SignUp;