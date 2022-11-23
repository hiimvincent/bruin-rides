import { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

import logo from '../blue.png';

import '../App.css';
import { Button } from '@mui/material';
import { useAuth } from "../Auth";

import React from 'react'
import { BsPersonCircle } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi'

function RouteHeader() {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    
    const logout = () => {
        setUser(null);
        navigate("/home")
    };

    return (
        <div className="App">
            <div className="container">
                <ul>
                    {user ? 
                    <li>
                        <Link to="/search" onClick={logout}>Log Out</Link> 
                    </li>
                    : <div/>}

                    {user ? 
                    <div>
                    <li>
                        <Link to="/edit"><FiSettings/></Link>
                    </li>
                    <li>
                        <Link to="/account"> <BsPersonCircle/> </Link>
                    </li> 
                    </div>
                    :
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    }

                    <li>
                        <Link to="/about">About</Link>
                    </li>

                    {user ? 
                    <li>
                        <Link to="/add">Add Ride</Link>
                    </li>
                    : <div/>}
                    

                    <li>
                        <Link to="/search">Search</Link>
                    </li>

                    <logo>
                        <img src={logo} alt="Logo" width="70" />
                        <h2> Bruin Rides </h2>
                    </logo>
                </ul>
                
                <Outlet />
            </div>
        </div>
    );
}

export default RouteHeader;