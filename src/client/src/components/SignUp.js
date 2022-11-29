import { useState, useEffect } from 'react';
import axios from "axios";

import '../App.css';
import Register from './Register';

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