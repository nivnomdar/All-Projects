import {
  Autocomplete,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Popover,
  TextField,
} from "@mui/material";
import "./SearchFilters.css";
import {
  BorderAll,
  Favorite,
  MilitaryTech,
  MonetizationOnOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  downloadGamesAction,
  searchGameAction,
  selectedCategoryAction,
  topRatedGamesAction,
} from "../../../Redux/GamesReducer";
import Game from "../../../Modals/GameModal";
import { gamesWeb } from "../../../Redux/Store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function SearchFilters(): JSX.Element {
  const [allGames, setAllGames] = useState<Game[]>([]);

  const [filters, setFilter] = useState({
    favorites: false,
    priceFilter: false,
    searchText: "",
    categories: "",
  });
  const isTopRatedFilter = useSelector(
    (state: any) => state.games.isTopRatedFilter
  );
  const [selectedCategory, setSelectedCategory] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch();

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

  //  לחיצה על כפתור בחירת קטגוריה
  const handleCategoryButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  //  סגירת פילטר בחירת קטגוריה
  const handleCategoryClose = () => {
    setAnchorEl(null);
  };

  //  בחירת קטגוריה
  const handleCategorySelect = (category: string) => {
    console.log("Chosen category: ", category);
    setSelectedCategory(category);
    dispatch(selectedCategoryAction(category));
    handleCategoryClose();
  };

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
          {isTopRatedFilter ? (
            <Button
              type="button"
              color="warning"
              id="topRatedFilter"
              variant="contained"
              onClick={handleFilterTopRatedClick}>
              <MilitaryTech color="primary" />
            </Button>
          ) : (
            <Button
              type="button"
              color="warning"
              id="topRatedFilter"
              variant="outlined"
              onClick={handleFilterTopRatedClick}>
              <MilitaryTech color="primary" />
            </Button>
          )}
          <Button
            type="button"
            color="warning"
            id="priceFilter"
            variant="outlined">
            <MonetizationOnOutlined color="success" />
          </Button>
          <Button
            type="button"
            color="warning"
            id="categories"
            variant="outlined"
            onClick={handleCategoryButtonClick}>
            <BorderAll color="secondary" />
          </Button>

          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleCategoryClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            PaperProps={{ style: { maxHeight: "200px" } }} // Adjust the maxHeight as needed
          >
            <List>
              <ListItem onClick={() => handleCategorySelect("")}>
                <ListItemText primary="All Categories" />
              </ListItem>
              <Divider />
              {Array.from(
                new Set(
                  allGames
                    .flatMap((game) =>
                      game.categories
                        .split(", ")
                        .map((category) => category.trim())
                    )
                    .sort()
                )
              ).map((category) => (
                <ListItem
                  key={category}
                  onClick={() => handleCategorySelect(category)}>
                  <ListItemText primary={category} />
                </ListItem>
              ))}
            </List>
          </Popover>

          {/* <FormControl variant="outlined" sx={{ minWidth: 200 }}>
            <InputLabel id="category-label" color="warning">
              Category
            </InputLabel>
            <Select
              variant="filled"
              color="warning"
              labelId="category-label"
              id="category-select"
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              label="Category">
              <MenuItem value="">All Categories</MenuItem>
              {Array.from(
                new Set(
                  allGames.flatMap((game) => game.categories.split(", ")) // Split categories by ', ' and flatten the result
                )
              ).map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
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
