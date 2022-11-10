import React from 'react'
import { Link } from "react-router-dom";
import { Button }  from '@mui/material';

export default function Ride({details}) {
    return (
        <div className="item">
            <div className="desc">{details.desc}</div>
            <div className="address">{details.address}</div>
            <div className="date">Ride Date: {details.date}</div>
            <div className="time">Time: {details.time}</div>
            <div className="grpSize">Group Size: {details.grpSize}</div>
            <Button component={Link} to={"/view?rideid=" + details._id} variant="contained" color="primary">More Details</Button>
        </div>
    )
}