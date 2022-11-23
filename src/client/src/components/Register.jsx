import { useState, useCallback } from "react";
import "../register.css";
import AddInput from "./AddInput";
import SelectComponent from "./SelectComponent";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Auth";

const Register = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const firstName = values.firstName
  const lastName = values.lastName
  const email = values.email
  const password = values.password

  const navigate = useNavigate();

  const signUp = useCallback(
    (e) => {
      e.preventDefault();
      axios.post("http://localhost:5000/auth/signup", { email, password, firstName, lastName })
      .then((res) => (res.status == 201) ? successfulSignUp() : console.log(res)) 
      .catch((err) => console.log(err));
    }
  );

  const successfulSignUp = () => {
    navigate("/login");
  }

  const inputs = [
    {
      id: 1,
      name: "firstName",
      type: "text",
      placeholder: "Paul",
      label: "First Name",
      required: true,
    },
    {
      id: 2,
      name: "lastName",
      type: "text",
      placeholder: "Eggert",
      label: "Last Name",
      required: true,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Please enter a valid email!",
      label: "Email",
      required: true,
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 6-16 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$`,
      required: true,
    },
    {
      id: 5,
      name: "confPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords must match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="rform">
      <form onSubmit={signUp}>
        <h1>Create Account</h1>
        {inputs.map((input) => (
          <AddInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;