import { Button, TextField, Typography } from "@mui/material";
import "./Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginOutlined } from "@mui/icons-material";
import axios from "axios";

function Login(): JSX.Element {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  const submitLogin = async () => {
    if (userEmail.length < 4) {
      console.log("Password should have at least 4 characters");
      alert("Password should have at least 4 characters");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/login/",
        {
          email: userEmail,
          password: userPassword,
        },
        {
          withCredentials: true, // Add this line
        }
      );

      if (response.data.success) {
        console.log("User Login? -", response.data.success);

        // Assuming your backend sends a success flag upon successful login
        // authService.login(response.data.token); // Call the login function from authService
        navigate("/home"); // Redirect to the home page or the desired route
      } else {
        console.log("Login failed:", response.data.error);
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
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
          placeholder="email"
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
          placeholder="password"
        />
        <br /> <br />
        <Button
          type="button"
          color="primary"
          variant="contained"
          onClick={submitLogin}
          fullWidth>
          Login
          <LoginOutlined />
        </Button>
        <Typography className="registerText" variant="body2">
          Don't have an account? <Link to="/register">Register</Link>
        </Typography>
      </div>
    </div>
  );
}

export default Login;
