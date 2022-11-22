import React from "react";
import {
  BrowserRouter as Router,
  Link,
  useLocation
} from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";
import { Button } from '@mui/material';
import { useAuth } from "../Auth";
import AccountRide from './AccountRide';
import { BsPencilSquare } from 'react-icons/bs';
import IconButton from '@mui/material/IconButton';

function EditAccount() {
    const { user, setUser } = useAuth();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const [firstNameActive, setFirstNameActive] = useState(false);
    const [lastNameActive, setLastNameActive] = useState(false);
    const [emailActive, setEmailActive] = useState(false);

    useEffect(() => {
        const userIDs = [user]
          axios.post("http://localhost:5000/auth/get-users-by-ids", { userIDs })
          .then((result) => {
            setFirstName(result.data[0].firstName)
            setLastName(result.data[0].lastName)
            setEmail(result.data[0].email)
          })
          .catch((err) => console.log(err));
        })

    const updateAccount = (e) => {
        e.preventDefault();
        };

    return (
        <div className="App">
            <div className="container">
                <h1> Edit Account: </h1>
                <div className="rform">
                    <form onSubmit={updateAccount}>
                        <label>
                        First Name:
                        <div class="d-flex justify-content-between">
                            <input id="firstName" className="editAccountInput" type="text" placeholder={firstName} disabled={!firstNameActive}/>
                            <IconButton className="editAccountIcon" aria-label="edit" size="large" onClick={() => { setFirstNameActive(true) }}>
                                <BsPencilSquare/>
                            </IconButton> 
                        </div>
                        </label>

                        <label>
                        Last Name:
                        <div class="d-flex justify-content-between">
                            <input id="secondName" className="editAccountInput" type="text" placeholder={lastName} disabled={!lastNameActive}/>
                            <IconButton className="editAccountIcon" aria-label="edit" size="large" onClick={() => { setLastNameActive(true) }}>
                                <BsPencilSquare/>
                            </IconButton> 
                        </div>
                        </label>

                        <label>
                        Email:
                        <div class="d-flex justify-content-between">
                            <input id="email" className="editAccountInput" type="email" placeholder={email} disabled={!emailActive} errorMessage="Please enter a valid email!"/>
                            <IconButton className="editAccountIcon" aria-label="edit" size="large" onClick={() => { setEmailActive(true) }}>
                                <BsPencilSquare/>
                            </IconButton> 
                        </div>
                        </label>
                        <input type="submit" value="Update" />
                    </form>
                </div>
            </div>
        </div>
        );
}
    
export default EditAccount;