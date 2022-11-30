import React from 'react'
import { Link } from "react-router-dom";
import { Button }  from '@mui/material';
import { useAuth } from "../Auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CapacityBar from './CapacityBar';
import laxPic from "../components/background_photos/LAX.jpg"
import downtownPic from "../components/background_photos/LADowntown.jpg"
import hollywoodPic from "../components/background_photos/Hollywood.jpg"
import koreatownPic from "../components/background_photos/Koreatown.jpg"
import santamonicaPic from "../components/background_photos/SantaMonica.jpg"
import burbankPic from "../components/background_photos/Burbank.jpg"


export default function Ride({details, onDelete, onUpdateParam = () => {}}) {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const capacity = [{completed: (details.riders.length/details.grpSize)*100}];
    const hasJoined = user && details.riders.includes(user);
    const joinOrLeave = hasJoined ? "Leave Ride" : (details.riders.length < details.grpSize ? "Join Ride": "Ride Full");

    //Function to process database time into 12 hr time 
    function formatAMPM(date) {
        var hours = date.substring(0, 2)
        var minutes = date.substring(3, 5);
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '00' should be '12'
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
      }

    //Call function to update riders (by clicking join or leave ride)
    const updateRiders = () => {
        //If the user is authenticated, and has not joined ride, and ride has space, join the ride
        if (user && !details.riders.includes(user) && details.riders.length < details.grpSize) {
            //Prep database endpoint data and add user to ride entry
            const rideID = details._id
            let riders = details.riders.map((x) => x);
            riders.push(user);
            axios.post("http://localhost:5000/update-riders-by-id", { rideID, riders })
            .then((res) => console.log(res.data)) 
            .catch((err) => console.log(err));

            //Add ride ID to user entry
            axios.post("http://localhost:5000/auth/update-user-rides-by-id", { user, rideID })
            .then((res) => console.log(res.data)) 
            .catch((err) => console.log(err));
        } 
        //If the user has already joined the ride, 
        else if (hasJoined) {
            //Prep database endpoint data
            const rideID = details._id
            let riders = details.riders.map((x) => x);
            riders = riders.filter(function(value, index, arr){ 
                return value != user;
            });
            //If not last rider in ride, leave the ride
            if (riders.length > 0) {
                axios.post("http://localhost:5000/update-riders-by-id", { rideID, riders })
                .then((res) => console.log(res.data)) 
                .catch((err) => console.log(err));
            }
            //If last rider in ride, delete ride upon leaving
            else {
                axios.post("http://localhost:5000/delete-ride", { rideID })
                .then((res) => console.log(res.data)) 
                .catch((err) => console.log(err));
                onDelete();
                console.log("Called on delete")
            }

            //Remove ride ID from user database entry
            axios.post("http://localhost:5000/auth/remove-user-rides-by-id", { user, rideID })
            .then((res) => {
                console.log(res.data);
                onUpdateParam();
            }) 
            .catch((err) => console.log(err));
        } 
        //If user not authenticated, then redirect to login page
        else if (!user) {
            navigate("/login");
        }
    }

    //Render ride with photo, formatted ride details, ride capacity, and buttons to learn more about ride and join ride
    return (
        <div className="item">
            <img className="ridePhoto" 
                src={details.region == "LAX" ? laxPic : details.region == "Downtown" ? downtownPic : details.region == "Koreatown" ? koreatownPic : details.region == "Hollywood" ? hollywoodPic : details.region == "Santa Monica" ? santamonicaPic : burbankPic}
            />
            <div className='rideDetails'>
                <div className="address"><div className='category'><b>Region</b></div>{details.region}</div>
                <div className="address"><div className='category'><b>Destination</b></div><div className='destination'> {details.destination}</div></div>
                
                <div className="date"><div className='category'><b>Date</b></div> {details.date}</div>
                <div className="time"><div className='category'><b>Time</b></div> {formatAMPM(details.time)}</div>
                <div className="grpSize"><div className='category'><b>Riders</b></div> {details.riders.length} / {details.grpSize}</div>
                <div className ="CapacityBar">
                    {capacity.map((item) => (<CapacityBar completed={item.completed} />))}
                </div>
                <div className="desc"><div className='category'><b>Description</b></div> {details.desc}</div>
                
                {(details.riders.length < details.grpSize || hasJoined) ?
                    <Button variant="contained" color="primary" sx={{color: 'black', backgroundColor: 'white', fontWeight: 'bold', m: 1}}  onClick={updateRiders}>{joinOrLeave}</Button>
                :
                    <Button variant="contained" disabled color="primary" sx={{color: 'black', backgroundColor: 'white', fontWeight: 'bold', m: 1}} >Ride Full</Button>

                }
                <Button component={Link} to={"/view?rideid=" + details._id} variant="contained" color="primary" sx={{m: 1}} >More Details</Button>
            </div>
            

        </div>
    )
}