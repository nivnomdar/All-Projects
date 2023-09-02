import { Button, TextField, Typography } from "@mui/material";
import "./Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginOutlined } from "@mui/icons-material";
import axios from "axios";
import User from "../../Modals/UserModal";

function Login(): JSX.Element {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  const handleChange = () => {};

  const submitLogin = () => {
    if (userEmail.length < 4) {
      console.log("Password should have at least 4 characters");
      alert("Password should have at least 4 characters");
      return;
    }

    const data = {
      email: userEmail,
      password: userPassword,
    };

    console.log("clicked");

    axios
      .post("http://localhost:4000/api/users/checkLogin", data)
      .then((response) => {
        // const userID = response.data.userID;
        console.log(response);
      });
  };

  return (
    <div className="Login">
      <div className="Box">
        <Typography variant="h3" className="HeadLine">
          Login
        </Typography>
        <br />
        <TextField
          type="text"
          variant="outlined"
          className="inputField"
          value={userEmail}
          name="email"
          placeholder="Email"
          onChange={(args) => setUserEmail(args.target.value)}
        />
        <br />
        <TextField
          type="password"
          variant="outlined"
          className="inputField"
          value={userPassword}
          onChange={(args) => setUserPassword(args.target.value)}
          name="password"
          placeholder="Password"
        />
        <br /> <br />
        <Button
          type="button"
          color="primary"
          variant="contained"
          onClick={submitLogin}
          fullWidth>
          <LoginOutlined /> Login
        </Button>
        <Typography className="registerText" variant="body2">
          Don't have an account? <Link to="/register">Register</Link>
        </Typography>
      </div>
    </div>
  );
}

export default Login;
