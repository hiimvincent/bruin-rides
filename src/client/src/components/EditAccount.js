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
import Edit from './Edit'


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
    }, [user])

    const updateAccount = (e) => {
      e.preventDefault();
    };

    return (
      <div className="App">
        <div className="container">
          <div className="rform"> 
            <Edit/>
          </div>
        </div>
      </div>
    );
}
    
export default EditAccount;