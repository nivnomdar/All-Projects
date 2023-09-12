import { useEffect, useState } from "react";
import "./Search.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { gamesWeb } from "../../Redux/Store";
import { Button, TextField } from "@mui/material";
import {
  Favorite,
  Login,
  MilitaryTech,
  MonetizationOnOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { downloadGamesAction } from "../../Redux/GamesReducer";
import Game from "../../Modals/GameModal";
import Autocomplete from "@mui/material/Autocomplete";

function Search(): JSX.Element {
  const [searchText, setSearchText] = useState("");
  const [allGames, setAllGames] = useState<Game[]>([]);
  let filteredGames: any[] = [];
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (gamesWeb.getState().games.allGames.length < 2) {
      axios
        .get("http://localhost:4000/api/Games/allGames")
        .then((response) => response.data)
        .then((result) => {
          gamesWeb.dispatch(downloadGamesAction(result));
          console.log("new Loading:", result);
          setAllGames(result);
          // if (searchText) {
          //   filteredGames = allGames.filter((game) =>
          //     game.game_name.toLowerCase().includes(searchText.toLowerCase())
          //   );
          // }
          console.log(top100Films);
        });
      setRefresh(true);
    }
  }, [allGames]);

  const searchGame = () => {
    navigate(`/search/${searchText}`);
  };

  const Categories = () => {};

  const top100Films = allGames.map((game) => ({
    game_id: game.game_id,
    game_name: game.game_name,
  }));

  return (
    <div className="SearchGame">
      <div className="colimn left">
        <Button
          className="Login"
          type="button"
          color="primary"
          variant="contained"
          id="login">
          Login <Login />
        </Button>
      </div>
      <div className="column middle">
        <div className="input-group">
          <Button
            className="Login"
            type="button"
            color="warning"
            id="favoritesFilter"
            variant="outlined">
            <Favorite color="error" />
          </Button>
          <Button
            type="button"
            color="warning"
            id="topRatedFilter"
            variant="outlined">
            <MilitaryTech color="primary" />
          </Button>
          <Button
            type="button"
            color="warning"
            id="priceFilter"
            variant="outlined">
            <MonetizationOnOutlined color="success" />
          </Button>
        </div>
      </div>
      <div className="column right">
        <div className="input-group" id="searchInputs">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            style={{ color: "yellow" }}
            // color="success"
            options={top100Films}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search..."
                color="warning"
                value={searchText}
                variant="filled"
                onChange={(event) => setSearchText(event.target.value)}
              />
            )}
            getOptionLabel={(option) => option.game_name}
          />
          <Button
            type="button"
            color="success"
            id="searchButton"
            variant="contained"
            onClick={searchGame}>
            <SearchOutlined color="inherit" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Search;
