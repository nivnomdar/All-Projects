import { useEffect, useState } from "react";
import "./Header.css";
import User from "../../Modals/UserModal";
import { gamesWeb } from "../../Redux/Store";
import axios from "axios";
import { downloadUsersAction } from "../../Redux/UsersReducer";

function Header(): JSX.Element {
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    if (gamesWeb.getState().users.allUsers.length < 1) {
      axios
        .get("http://localhost:4000/api/users/allNoPass")
        .then((response) => response.data)
        .then((result) => {
          gamesWeb.dispatch(downloadUsersAction(result));
          console.log("new Loading:", result);
          setAllUsers(result);
        });
    }
  }, [allUsers]);

  return <div className="Header">MY next GAME</div>;
}

export default Header;
