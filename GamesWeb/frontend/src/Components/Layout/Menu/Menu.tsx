import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
  return (
    <div className="Menu">
      <br />
      <NavLink to="/">Games</NavLink>
      <br /> <hr />
      <NavLink to="/categories">Categories</NavLink>
      <br /> <hr />
      <NavLink to="/favorites">Favorites</NavLink>
      <br /> <hr />
      <NavLink to="/about">about us</NavLink>
      <br /> <hr />
      Admin:
      <br />
      <hr />
      <NavLink to="/adminHome">Admin Home</NavLink>
      <br /> <hr />
      <NavLink to="/addGame">Add Game</NavLink>
      <br /> <hr />
    </div>
  );
}

export default Menu;
