import { Button } from "@mui/material";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


import { useAuth } from "../Auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const signUp = useCallback(
    (e) => {
      e.preventDefault();
      axios.post("http://localhost:5000/auth/signup", { email, password })
      .then((res) => (res.status == 201) ? successfulSignUp() : console.log(res)) 
      .catch((err) => console.log(err));
    },
    [email, password]
  );

  const successfulSignUp = () => {
    navigate("/login");
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={signUp}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Type username..."
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Type password..."
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUp;