import { useEffect, useState } from "react";
import "./Search.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { gamesWeb } from "../../Redux/Store";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

function Search(): JSX.Element {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  let allGames = gamesWeb.getState().games.allGames;
  const [categories, setCategories] = useState();
  const searchGame = () => {
    navigate(`/search/${searchText}`);
  };

  const Categories = () => {};

  return (
    <div className="SearchGame">
      <div className="input-group" id="searchInputs">
        <input
          type="text"
          className="form-control"
          id="searchBox"
          placeholder="Search game..."
          value={searchText}
          onChange={(args) => setSearchText(args.target.value)}></input>

        <button
          className="btn btn-outline-secondary"
          type="button"
          id="searchButton"
          onClick={searchGame}>
          Search
        </button>
      </div>
    </div>
  );
}

export default Search;
