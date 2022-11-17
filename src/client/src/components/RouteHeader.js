import { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

import '../App.css';
import { Button } from '@mui/material';
import { useAuth } from "../Auth";

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
                    <li>
                        <Link to="/search">Search</Link>
                    </li>
                    {user ? 
                    <li>
                        <Link to="/add">Add Ride</Link>
                    </li>
                    : <div/>}
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    {user ? 
                    <li>
                        <Link to="/account">My Account</Link>
                    </li> 
                    :
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    }
                </ul>
                {user ? <Button onClick={logout}>Log Out</Button> : <div/>}
                <Outlet />
            </div>
        </div>
    );
}

export default RouteHeader;