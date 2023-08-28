import { TextField, Typography } from "@mui/material";
import "./Login.css";
import { useState } from "react";

function Login(): JSX.Element {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
          className="firstName"
          value={formData.first_name}
          onChange={handleChange}
          name="first_name"
          placeholder="First name"
        />
        <br />
      </div>{" "}
    </div>
  );
}

export default Login;
