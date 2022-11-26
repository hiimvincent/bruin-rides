import React from "react";
import { useState, useEffect } from 'react';
import axios from "axios";
import { useAuth } from "../Auth";
import AccountRide from './AccountRide';
import { ProgressBar } from  'react-loader-spinner'


function Account() {
    const { user, setUser } = useAuth();
    const [toRender, setRender] = useState("");


    useEffect(() => {
        fetchData();
    }, [user])

    const fetchData = () => {
      const userIDs = [user]
      console.log("test") 
        axios.post("http://localhost:5000/auth/get-users-by-ids", { userIDs })
        .then((result) => {
          
          axios.post("http://localhost:5000/auth/getAllRides", { user })
          .then((res) => {
            setRender(
              <div>
            <h1>{result.data[0].firstName} {result.data[0].lastName}'s Rides:</h1>
            <div className="list">
              {res.data.sort((a, b) => {
                  let d1 = Date.parse(a.date);
                  let d2 = Date.parse(b.date);
                  return d1 - d2;
                })
                .map(ride => <AccountRide
                  key={ride._id}
                  details={ride}
              />)}
            </div>
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
            { 
            toRender ? 
            toRender : 
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
        );
}
    
export default Account;