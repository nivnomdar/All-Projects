import { useEffect, useState } from "react";
import "./Header.css";
import User from "../../Modals/UserModal";
import { gamesWeb } from "../../Redux/Store";
import axios from "axios";
import { downloadUsersAction } from "../../Redux/UsersReducer";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AccountCircle, Login, Logout } from "@mui/icons-material";
import Nifweb from "../../images/small-Image .jpeg";

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
          // const userName = `${result[0].first_name} ${result[0].last_name}`;
          setAllUsers(result);
          console.log("all users:", result);
        });
    }
  }, []);

  return (
    <div className="Header row">
      <div className="col">
        <Button
          className="Login"
          type="button"
          color="inherit"
          variant="contained"
          id="login"
          onClick={() => {
            navigate("/login");
          }}>
          Login
          <AccountCircle color="secondary" />
        </Button>
      </div>
      <div className="Title col">
        <img src={Nifweb} width={50} />
      </div>
    </div>
  );
}

export default Header;

{
  /* <div className="AuthButtons">
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
            navigate("/login"); // Redirect to the login page
          }}>
          Logout
          <Logout />
        </Button>
        )
      </div> */
}
