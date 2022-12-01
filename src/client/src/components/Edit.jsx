import { useState, useCallback, useEffect } from 'react';
import AddFixedInput from "./AddFixedInput";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Auth";

import "../register.css";


const Edit = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const { user, setUser } = useAuth();
  const [firstNameOld, setFirstName] = useState("");
  const [lastNameOld, setLastName] = useState("");
  const [emailOld, setEmail] = useState("");

  const [firstNameActive, setFirstNameActive] = useState(false);
  const [lastNameActive, setLastNameActive] = useState(false);
  const [emailActive, setEmailActive] = useState(false);

  //On page render, get user details from authenticated userID and store in state
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

  //Store value to overwrite - defaults to current name/email
  const firstName = values.firstName == "" ? firstNameOld : values.firstName
  const lastName = values.lastName == "" ? lastNameOld : values.lastName
  const email = values.email == "" ? emailOld : values.email
  const navigate = useNavigate();

  //When edit button pressed, call database endpoint and update account
  const edit = useCallback(
    (e) => {
      e.preventDefault();
      const userID = user
      if (values.firstName != "" || values.lastName != "" || values.email != "") {
        axios.post("http://localhost:5000/auth/update-user-by-id", { userID, email, firstName, lastName })
        .then((res) => (res.status == 201 || res.status == 200) ? successfulEdit() : console.log(res)) 
        .catch((err) => console.log(err));
      }
      
    }
  );

  //When successful, navigate to account page to display new account
  const successfulEdit = () => {
    navigate("/account");
  }

  //Sets props for necessary input fields
  const inputs = [
    {
      id: 1,
      name: "firstName",
      type: "text",
      placeholder: firstNameOld,
      label: "First Name",
      required: true,
      className: "editAccountInput",
      disabled: !firstNameActive
    },
    {
      id: 2,
      name: "lastName",
      type: "text",
      placeholder: lastNameOld,
      label: "Last Name",
      required: true,
      className: "editAccountInput",
      disabled: !lastNameActive

    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: emailOld,
      errorMessage: "Please enter a valid email!",
      label: "Email",
      required: true,
      className: "editAccountInput",
      disabled: !emailActive
    }
  ];

  //Create function to update state upon input change
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  
  //Create function to activate an input field by clicking icon
  const onClick = (id) =>{
    if (id == 1){
        setFirstNameActive(true)
    }
    else if (id == 2){
        setLastNameActive(true)
    }
    else if (id == 3){
        setEmailActive(true)
    }
  }

  //Map input props into Fixed Input components, and call edit function upon form submission
  return (
    <div className="app">
      <form onSubmit={edit}>
        <h1> Edit Account </h1>
        {inputs.map((input) => (
            <AddFixedInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
              onClick={onClick}
            />                            
        ))}
        <button>Update</button>
      </form>
    </div>
  );
};

export default Edit;