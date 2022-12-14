import { Button } from "@mui/material";
import { useState, useCallback } from "react";
import { useNavigate, Link, useLocation} from "react-router-dom";
import axios from "axios";


import { useAuth } from "../Auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, user } = useAuth();
  const navigate = useNavigate();

  //On login button press, call database endpoint with email and password
  const login = useCallback(
    (e) => {
      e.preventDefault();
      axios.post("http://localhost:5000/auth/login", { email, password })
      .then((res) => (res.status == 200) ? successfulLogin(res.data.id) : console.log(res)) 
      .catch((err) => console.log(err));
    },
    [setUser, email, password]
  );

  //Upon successful login, set authentication state and move to account page
  const successfulLogin = (userID) => {
    setUser(userID)
    navigate("/account");
  }

  //Return login page: header, input fields, sign in button and sign up button
  return (
    <div className="rform">
      <form onSubmit={login}>
      <h1> Login </h1>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email..."
      />
      <input
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password..."
      />
      <button type="submit">Sign In</button>
      <center>
      <div>
          <Button component={Link} to="/signup">Create Account</Button>
      </div>
      </center>
      </form>
    </div>
  );
};

export default Login;