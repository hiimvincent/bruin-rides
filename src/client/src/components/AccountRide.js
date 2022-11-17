import React from 'react'
import { Link, Navigate } from "react-router-dom";
import { Button }  from '@mui/material';
import { useAuth } from "../Auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function AccountRide({details}) {
    return (
        <div className="item">
            <div className="desc">{details.desc}</div>
            <div className="address">{details.address}</div>
            <div className="date">Ride Date: {details.date}</div>
            <div className="time">Time: {details.time}</div>
            <div className="grpSize">Group Size: {details.grpSize}</div>
            <div className="grpSize"># of Riders: {details.riders.length}</div>
            <Button component={Link} to={"/view?rideid=" + details._id} variant="contained" color="primary">More Details</Button>
        </div>
    )
}