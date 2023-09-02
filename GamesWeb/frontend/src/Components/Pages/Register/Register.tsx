import { Button, TextField, Typography } from "@mui/material";
import "./Register.css";
import { useEffect, useState } from "react";
import { HowToReg } from "@mui/icons-material";
import User from "../../Modals/UserModal";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { addUserAction, downloadUsersAction } from "../../Redux/UsersReducer";
import { gamesWeb } from "../../Redux/Store";

function Register(): JSX.Element {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [allUsers, setAllUsers] = useState<User[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/users/allNoPass"
        );
        setAllUsers(response.data);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const checkForm = async () => {
    // מוודא ששם ושם משפחה לא יהיו ריקים
    if (formData.first_name.trim() === "" || formData.last_name.trim() === "") {
      console.log("First name and last name are required");
      alert("First name and last name are required");
      return;
    }
    //  מוודא שהאימייל לא קיים כבר
    const checkEmailExist = allUsers.some(
      (user) => user.email.toLowerCase() === formData.email.toLowerCase()
    );
    if (checkEmailExist) {
      console.log("email already exists");
      alert("email already exists");
      return;
    }

    //  מוודא שהאימייל חוקי
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      console.log("Invalid email");
      alert("Invalid email");
      return;
    }

    // סיסמא מינימום 4 תווים
    if (formData.password.length < 4) {
      console.log("Password should have at least 4 characters");
      alert("Password should have at least 4 characters");
      return;
    }
    addNewUser();
  };

  const addNewUser = async () => {
    const newUser = new User(
      gamesWeb.getState().users.allUsers.length + 1,
      formData.first_name,
      formData.last_name,
      formData.email,
      formData.password,
      "user"
    );
    console.log(newUser);

    await axios
      .post("http://localhost:4000/api/users/addUser", newUser)
      .then((response) => {
        console.log(response);
        gamesWeb.dispatch(addUserAction(newUser));
        console.log("Thank you for your register!");
        alert("Registered! :)");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        alert("Error");
      });
  };

  return (
    <div className="Register">
      <div className="Box">
        <Typography variant="h3" className="HeadLine">
          Register
        </Typography>
        <br />
        <TextField
          type="text"
          variant="outlined"
          className="inputField"
          value={formData.first_name}
          onChange={handleChange}
          name="first_name"
          placeholder="First name"
        />
        <br />
        <TextField
          type="text"
          variant="outlined"
          className="inputField"
          value={formData.last_name}
          onChange={handleChange}
          name="last_name"
          placeholder="Last name"
        />
        <br />
        <TextField
          type="text"
          variant="outlined"
          className="inputField"
          value={formData.email}
          onChange={handleChange}
          name="email"
          placeholder="email"
        />
        <br />
        <TextField
          type="text"
          variant="outlined"
          className="inputField"
          value={formData.password}
          onChange={handleChange}
          name="password"
          placeholder="Password"
        />
        <br /> <br />
        <Button
          type="button"
          color="primary"
          variant="contained"
          onClick={checkForm}
          className="registerButton">
          <HowToReg /> Register
        </Button>
        <Typography className="loginText" variant="body2">
          Already a member? <Link to="/login">Login</Link>
        </Typography>
      </div>
    </div>
  );
}

export default Register;
