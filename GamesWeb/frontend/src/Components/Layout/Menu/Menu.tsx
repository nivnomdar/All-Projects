import { NavLink, useNavigate } from "react-router-dom";
import "./Menu.css";
import authService from "../../Pages/Login/authService";

function Menu(): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className="Menu">
      {authService.isAuthenticated() ? (
        <div className="userMenu">
          <br />
          menu
          <hr />
          <NavLink to="/home" className="menu-link">
            Games
          </NavLink>
          <br />
          <hr />
          <NavLink to="/favorites" className="menu-link">
            Favorites
          </NavLink>
          <br />
          <hr />
          Admin:
          <br />
          <hr />
          <NavLink to="/adminHome" className="menu-link">
            Admin Home
          </NavLink>
          <br />
          <hr />
          <NavLink to="/addGame" className="menu-link">
            Add Game
          </NavLink>
          <br />
        </div>
      ) : (
        <></>
      )}
      <hr />
      <NavLink to="/about" className="menu-link">
        about us
      </NavLink>
      <hr /> <br />
    </div>
  );
}

export default Menu;
