import React from 'react'
import { Link, Navigate } from "react-router-dom";
import { Button }  from '@mui/material';
import { useAuth } from "../Auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CapacityBar from './CapacityBar';
import lax from '../lax.png'

export default function Ride({details, onDelete}) {
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
            if (riders.length > 0) {
                axios.post("http://localhost:5000/update-riders-by-id", { rideID, riders })
                .then((res) => console.log(res.data)) 
                .catch((err) => console.log(err));
            } else {
                axios.post("http://localhost:5000/delete-ride", { rideID })
                .then((res) => console.log(res.data)) 
                .catch((err) => console.log(err));
                onDelete();
                console.log("Called on delete")
            }

            axios.post("http://localhost:5000/auth/remove-user-rides-by-id", { user, rideID })
            .then((res) => console.log(res.data)) 
            .catch((err) => console.log(err));
        } else if (!user) {
            navigate("/login");
        }
    }


    return (
        <div className="item">
            <div className="address"><div className='category'><b>Region</b></div>{details.region}</div>
            <div className="address"><div className='category'><b>Destination</b></div> {details.destination}</div>
            
            <div className="date"><div className='category'><b>Date</b></div> {details.date}</div>
            <div className="time"><div className='category'><b>Time</b></div> {details.time}</div>
            <div className="grpSize"><div className='category'><b>Riders</b></div> {details.riders.length} / {details.grpSize}</div>
            <div className ="CapacityBar">
                {capacity.map((item) => (<CapacityBar completed={item.completed} />))}
            </div>
            <div className="desc"><div className='category'><b>Description</b></div> {details.desc}</div>
            <Button variant="contained" color="primary" sx={{color: 'black', backgroundColor: 'white', fontWeight: 'bold', m: 1}}  onClick={updateRiders}>{joinOrLeave}</Button>
            <Button component={Link} to={"/view?rideid=" + details._id} variant="contained" color="primary" sx={{m: 1}} >More Details</Button>

        </div>
    )
}