import { Button } from "@mui/material";
import { useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";


import { useAuth } from "../Auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, user } = useAuth();
  const navigate = useNavigate();

  const login = useCallback(
    (e) => {
      e.preventDefault();
      axios.post("http://localhost:5000/auth/login", { email, password })
      .then((res) => (res.status == 200) ? successfulLogin(res.data.id) : console.log(res)) 
      .catch((err) => console.log(err));
    },
    [setUser, email, password]
  );

  const successfulLogin = (userID) => {
    setUser(userID)
    navigate("/search");
  }

  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={login}>
        <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Username..."
        />
        <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password..."
        />
        <Button type="submit">Login</Button>
        </form>
        <div>Don't have an account?
            <Button component={Link} to="/signup">Sign Up!</Button>
        </div>
    </div>
  );
};

export default Login;