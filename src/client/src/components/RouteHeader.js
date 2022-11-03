import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

import '../App.css';

function RouteHeader() {

  return (
    <div className="App">
        <div className="container">
            <h1>Navigation!</h1>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/search">Search</Link>
                </li>
                <li>
                    <Link to="/add">Add Ride</Link>
                </li>
            </ul>
        </div>
    </div>
  );
}

export default RouteHeader;