import { NavLink } from "react-router-dom";
import "./Menu.css";
import { useEffect, useState } from "react";

function Menu(): JSX.Element {
  return (
    <div className="Menu">
      <h2>Main Menu</h2>
      <hr />
      <NavLink to="/">All</NavLink>
      <br />
      <br />
      <NavLink to="/addNewNote">Add</NavLink>
      <br />
      <br />
      <NavLink to="/favorites">Favorites</NavLink>
      <br />
      <br />
      <NavLink to="/about">About Us</NavLink>
      <hr />
    </div>
  );
}

export default Menu;
