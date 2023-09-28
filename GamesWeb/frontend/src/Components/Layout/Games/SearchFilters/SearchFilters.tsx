import { Autocomplete, Button, TextField } from "@mui/material";
import "./SearchFilters.css";
import {
  Favorite,
  MilitaryTech,
  MonetizationOnOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  downloadGamesAction,
  filteredGamesAction,
  searchGameAction,
  topRatedGamesAction,
} from "../../../Redux/GamesReducer";
import Game from "../../../Modals/GameModal";
import { gamesWeb } from "../../../Redux/Store";
import { useSelector } from "react-redux";

function SearchFilters(): JSX.Element {
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [filters, setFilter] = useState({
    favorites: false,
    priceFilter: false,
    searchText: "",
  });
  const isTopRatedFilter = useSelector(
    (state: any) => state.games.isTopRatedFilter
  );

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/Games/allGames")
      .then((response) => response.data)
      .then((result) => {
        gamesWeb.dispatch(downloadGamesAction(result));
        console.log("new Loading:", result.length);
        setAllGames(result);
      });
  }, []);

  const handleSearchGame = () => {
    const searchText = filters.searchText.toLowerCase();
    gamesWeb.dispatch(searchGameAction(searchText));
  };

  const handleFilterTopRatedClick = () => {
    gamesWeb.dispatch(topRatedGamesAction(!isTopRatedFilter));
  };

  const topGames = allGames.map((game) => ({
    game_id: game.game_id,
    game_name: game.game_name,
  }));

  return (
    <div className="SearchFilters">
      <div className="column left">
        <div className="input-group">
          <Button
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
            variant="outlined"
            onClick={handleFilterTopRatedClick}>
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
        <div className="input-group">
          <Autocomplete
            disablePortal
            freeSolo // Allow free text input
            id="combo-box-demo"
            // color="success"
            options={topGames.map((optionGame) => optionGame.game_name)} // Provide only the game names as options
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                type="text"
                color="success"
                placeholder="│  Search..."
                variant="outlined"
                value={filters.searchText} // Ensure the input value is controlled by the state
                onChange={(event) => {
                  // Update the searchText state when the input field changes
                  setFilter({ ...filters, searchText: event.target.value });
                }}
              />
            )}
            onInputChange={(event, newInputValue) => {
              // Update the searchText state when the input value changes
              setFilter({ ...filters, searchText: newInputValue });
            }}
          />
          <Button
            type="button"
            color="success"
            id="searchButton"
            variant="contained"
            onClick={handleSearchGame}>
            <SearchOutlined color="inherit" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SearchFilters;
