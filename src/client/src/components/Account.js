import React from "react";
import { useState, useEffect } from 'react';
import axios from "axios";
import { useAuth } from "../Auth";
import { ProgressBar } from  'react-loader-spinner'
import Ride from "./Ride";
import { Link } from "react-router-dom";


function Account() {
  const { user, setUser } = useAuth();
  const [toRender, setRender] = useState("");


  //On loading, fetch rides for authenticated userID
  useEffect(() => {
      fetchData();
  }, [user])

  const fetchData = () => {
    const userIDs = [user]

    //Fetch user details for authenticated userID
    axios.post("http://localhost:5000/auth/get-users-by-ids", { userIDs })
    .then((result) => {

      //Fetch rides for userID
      axios.post("http://localhost:5000/auth/getAllRides", { user })
      .then((res) => {
        
        //Render body of account page (header, sorted rides)
        setRender(
        <div>
          <h1>{result.data[0].firstName} {result.data[0].lastName}'s Rides:</h1>
          {res.data.length > 0 ?
            <div className='rides'>
              { res.data.sort((a, b) => {
                  let d1 = Date.parse(a.date);
                  let d2 = Date.parse(b.date);
                  return d1 - d2;
                })
                .map(ride => <Ride
                  key={ride._id}
                  details={ride}
                  onUpdateParam = {fetchData}
              />) }
            </div>
            : 
            <center>
              <h2 className="noRides"> Get started by <Link to="/search">joining a ride</Link> or <Link to="/add">creating your own!</Link></h2>
            </center>
          }
        </div>
        )
      }) 
      .catch((err) => console.log(err));
    }
      )
      .catch((err) => console.log(err));
  }
  
  return (
    <div className="App">
      <div className="container">
        <div classname="list">
          { 
            toRender ? 
            toRender
              : 
            <center>
              <ProgressBar
                height="80"
                width="160"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass="progress-bar-wrapper"
                borderColor = '#eed445'
                barColor = '#2773ad'
              />
            </center>
          }
        </div>
      </div>
    </div>
  );
}
    
export default Account;