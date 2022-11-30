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
        <div>
            <ul class="ulHeader">
                {user ? 
                    <li className='routeHeader'>
                        <Link to="/search" onClick={logout}><b>Log Out</b></Link> 
                    </li>
                : <div/>}

                {user ? 
                    <div>
                        <li className='routeHeader'>
                            <Link to="/edit"><FiSettings size="20"/></Link>
                        </li>
                        <li className='routeHeader'>
                            <Link to="/account"> <BsPersonCircle size="20"/> </Link>
                        </li> 
                    </div>
                    :
                    <li className='routeHeader'>
                        <Link to="/login"><b>Login</b></Link>
                    </li>
                }

                <li className='routeHeader'>
                    <Link to="/about"><b>About</b></Link>
                </li>

                {user ? 
                    <li className='routeHeader'>
                        <Link to="/add"><b>Add Ride</b></Link>
                    </li>
                    : <div/>
                }
                
                <li className='routeHeader'>
                    <Link to="/search"><b>Search</b></Link>
                </li>

                <logo>
                    <Link to="/search" style={{ textDecoration: 'none', color: "#000000" }}>
                        <img src={logo} alt="Logo" width="70" />
                        <h2> Bruin Rides </h2>
                    </Link>
                </logo>
            </ul>
            <Outlet />
        </div>
    );
}

export default RouteHeader;