import { useEffect, useState } from "react";
// import "./Search.css";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { gamesWeb } from "../../Redux/Store";
// import { Button, TextField } from "@mui/material";
// import {
//   AccountCircle,
//   Favorite,
//   MilitaryTech,
//   MonetizationOnOutlined,
//   SearchOutlined,
// } from "@mui/icons-material";
// import { downloadGamesAction } from "../../Redux/GamesReducer";
// import Game from "../../Modals/GameModal";
// import Autocomplete from "@mui/material/Autocomplete";

// function Search(): JSX.Element {
//   const [searchText, setSearchText] = useState("");
//   const [allGames, setAllGames] = useState<Game[]>([]);
//   const [filter, setFilter] = useState({
//     favorites: false,
//     topRated: false,
//     priceFilter: false,
//     searchText: "",
//   });
//   const [refresh, setRefresh] = useState(false);

//   // Filters
//   const [sortByRating, setSortByRating] = useState(true); // State for sorting order

//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("http://localhost:4000/api/Games/allGames")
//       .then((response) => response.data)
//       .then((result) => {
//         gamesWeb.dispatch(downloadGamesAction(result));
//         console.log("new Loading:", result);
//         setAllGames(result);
//         // if (searchText) {
//         //   filteredGames = allGames.filter((game) =>
//         //     game.game_name.toLowerCase().includes(searchText.toLowerCase())
//         //   );
//         // }
//         console.log(top100Films);
//         setRefresh(true);
//       });
//   }, []);

//   const applyFilters = () => {
//     // Update filter state based on user selections
//     setFilter({
//       favorites: true, // Example: set to true if the user selected favorites
//       topRated: true, // Example: set to true if the user selected top rated
//       priceFilter: true, // Example: set to true if the user selected price filter
//       searchText: searchText, // Example: set to the user's search query
//     });
//   };

//   const searchGame = () => {
//     navigate(`/games/search/${searchText}`);
//     console.log(searchText);
//   };

//   const top100Films = allGames.map((game) => ({
//     game_id: game.game_id,
//     game_name: game.game_name,
//   }));

//   // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//   //   const { value, checked } = event.target;
//   //   console.log({ value, checked });
//   //   console.log("Selected value:", value);
//   //   console.log(value);
//   //   if (value) {
//   //     // Update searchText with the selected game name (string)
//   //     setSearchText(value);
//   //     // navigate(`/gamePlayer/${value}`);
//   //   } else {
//   //     console.log("No games.");
//   //     // No value selected, set searchText to an empty string
//   //     // navigate(`/gamePlayer/${value.game_id}`);
//   //   }
//   // };

//   return (
//     <div className="SearchGame">
//       <div className="colimn left">
//         <Button
//           className="Login"
//           type="button"
//           color="inherit"
//           variant="contained"
//           id="login">
//           Login
//           <AccountCircle color="secondary" />
//         </Button>
//       </div>
//       <div className="column middle">
//         <div className="input-group">
//           <Button
//             type="button"
//             color="warning"
//             id="favoritesFilter"
//             variant="outlined">
//             <Favorite color="error" />
//           </Button>
//           <Button
//             type="button"
//             color="warning"
//             id="topRatedFilter"
//             variant="outlined">
//             <MilitaryTech color="primary" />
//           </Button>
//           <Button
//             type="button"
//             color="warning"
//             id="priceFilter"
//             variant="outlined">
//             <MonetizationOnOutlined color="success" />
//           </Button>
//         </div>
//       </div>
//       <div className="column right">
//         <div className="input-group">
//           <Autocomplete
//             disablePortal
//             id="combo-box-demo"
//             // color="success"
//             options={top100Films}
//             sx={{ width: 300 }}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 color="success"
//                 variant="standard"
//                 label="Search..."
//                 value={searchText} // Ensure the input value is controlled by the state
//                 onChange={(event) => {
//                   // Update the searchText state when the input field changes
//                   setSearchText(event.target.value);
//                 }}
//               />
//             )}
//             getOptionLabel={(option) => option.game_name}

//             // onChange={(event, value) => {
//             //   console.log("Selected value:", value);
//             //   console.log(value);
//             //   if (value) {
//             //     // Update searchText with the selected game name (string)
//             //     setSearchText(value.game_name);
//             //     navigate(`/gamePlayer/${value.game_id}`);
//             //   } else {
//             //     setSearchText(value.game);

//             //     // No value selected, set searchText to an empty string
//             //     // navigate(`/gamePlayer/${value.game_id}`);
//             //   }
//             // }}
//           />
//           <Button
//             type="button"
//             color="success"
//             id="searchButton"
//             variant="contained"
//             onClick={searchGame}>
//             <SearchOutlined color="inherit" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Search;
