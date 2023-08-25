import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
  return (
    <div className="Menu">
      <h2>Main Menu</h2>
      <hr />
      <NavLink to="/">Home</NavLink>
      <br />
      <hr />

      <NavLink to="/AddForm">Add</NavLink>
      <br />
      <hr />
    </div>
  );
}

export default Menu;
