import { useEffect, useState } from "react";
import "./Header.css";
import User from "../../Modals/UserModal";
import { gamesWeb } from "../../Redux/Store";
import axios from "axios";
import { downloadUsersAction } from "../../Redux/UsersReducer";
import authService from "../../Pages/Login/authService";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Login, Logout } from "@mui/icons-material";

function Header(): JSX.Element {
  const [allUsers, setAllUsers] = useState<User[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (gamesWeb.getState().users.allUsers.length < 1) {
      axios
        .get("http://localhost:4000/api/users/allNoPass")
        .then((response) => response.data)
        .then((result) => {
          gamesWeb.dispatch(downloadUsersAction(result));
          console.log("new Loading:", result);
          setAllUsers(result);

          if (authService.isAuthenticated()) {
            console.log("Logged in!");
            return navigate("/home");
          } else {
            return navigate("/login");
          }
        });
    }
  }, [allUsers]);

  return (
    <div className="Header row">
      <h1>MY next GAME</h1>
      <div className="AuthButtons">
        {!authService.isAuthenticated() ? (
          <Button
            onClick={() => {
              // console.log("Handle Login");
              navigate("/login");
            }}>
            Login <Login />
          </Button>
        ) : (
          <Button
            onClick={() => {
              authService.logout(); // Call the logout function from authService
              navigate("/login"); // Redirect to the login page
            }}>
            Logout
            <Logout />
          </Button>
        )}
      </div>
    </div>
  );
}

export default Header;