import React from 'react'
import { Link, Navigate } from "react-router-dom";
import { Button }  from '@mui/material';
import { useAuth } from "../Auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CapacityBar from './CapacityBar';

export default function Ride({details}) {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const capacity = [{completed: (details.riders.length/details.grpSize)*100}];

    const hasJoined = user && details.riders.includes(user);
    const joinOrLeave = hasJoined ? "Leave Ride" : "Join Ride";


    const updateRiders = () => {
        console.log(details);
        if (user && !details.riders.includes(user) && details.riders.length < details.grpSize) {
            const rideID = details._id
            let riders = details.riders.map((x) => x);
            riders.push(user);
            axios.post("http://localhost:5000/update-riders-by-id", { rideID, riders })
            .then((res) => console.log(res.data)) 
            .catch((err) => console.log(err));

            axios.post("http://localhost:5000/auth/update-user-rides-by-id", { user, rideID })
            .then((res) => console.log(res.data)) 
            .catch((err) => console.log(err));
        } else if (hasJoined) {
            const rideID = details._id
            let riders = details.riders.map((x) => x);
            riders = riders.filter(function(value, index, arr){ 
                return value != user;
            });
            axios.post("http://localhost:5000/update-riders-by-id", { rideID, riders })
            .then((res) => console.log(res.data)) 
            .catch((err) => console.log(err));

            axios.post("http://localhost:5000/auth/remove-user-rides-by-id", { user, rideID })
            .then((res) => console.log(res.data)) 
            .catch((err) => console.log(err));
        } else if (!user) {
            navigate("/login");
        }
    }


    return (
        <div className="item">
            <div className="address">Region: {details.region}</div>
            <div className="address">Destination: {details.destination}</div>
            <div className="date">Ride Date: {details.date}</div>
            <div className="time">Time: {details.time}</div>
            <div className="grpSize">Riders: {details.riders.length} / {details.grpSize}</div>
            <div className ="CapacityBar">
                {capacity.map((item) => (<CapacityBar completed={item.completed} />))}
            </div>
            <div className="desc">Description: {details.desc}</div>
            <Button variant="contained" color="primary" sx={{color: 'black', backgroundColor: 'white', fontWeight: 'bold', m: 1}}  onClick={updateRiders}>{joinOrLeave}</Button>
            <Button component={Link} to={"/view?rideid=" + details._id} variant="contained" color="primary" sx={{m: 1}} >More Details</Button>

        </div>
    )
}