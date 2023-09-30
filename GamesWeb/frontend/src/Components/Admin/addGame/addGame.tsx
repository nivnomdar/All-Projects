import { Button, Checkbox, TextField, Typography } from "@mui/material";
import "./addGame.css";
import { useState } from "react";
import Game from "../../Modals/GameModal";
import axios from "axios";
import { AddCircleOutline, CheckBox } from "@mui/icons-material";
import { gamesWeb } from "../../Redux/Store";
import { useNavigate } from "react-router-dom";
import { addGameAction } from "../../Redux/GamesReducer";

function AddGame(): JSX.Element {
  const [formData, setFormData] = useState({
    game_name: "",
    release_date: "",
    categories: "",
    platforms: "",
    developer: "",
    publisher: "",
    short_description: "",
    rating: "",
    price: "",
    multiplayer: 0,
    mod_support: 0,
    achievements: 1,
    image_url: "",
  });

  // Create a mapping of field names to placeholders

  const navigate = useNavigate();

  const addNewGame = async () => {
    const newGame = new Game(
      gamesWeb.getState().games.allGames.length + 1,
      formData.game_name,
      formData.release_date,
      formData.categories,
      formData.platforms,
      formData.developer,
      formData.publisher,
      formData.short_description,
      formData.rating,
      formData.price,
      formData.multiplayer,
      formData.mod_support,
      formData.achievements,
      formData.image_url
    );
    await axios
      .post("http://localhost:4000/api/Games/addGame", newGame)
      .then((response) => {
        console.log(response);
        gamesWeb.dispatch(addGameAction(newGame)); // שמירה ברידקס ובזיכרון
        console.log(newGame, "added successesfully");
        alert("Game added successesfully");
        navigate("/adminHome");
      })
      .catch((error) => {
        console.log(error);
        alert("Erorr");
      });
  };

  // טיפול בשינויים של האינפוטים
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    const newValue =
      event.target.type === "checkbox" ? (checked ? 1 : 0) : value;
    // console.log({ name, value, checked, newValue });
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  return (
    <div className="addGame">
      <Typography variant="h5">Add Game</Typography>
      <div className="inputs">
        <br />
        <div className="textFields">
          <TextField
            label="Game name"
            type="text"
            variant="filled"
            color="error"
            className="textInputs"
            placeholder="Game name"
            value={formData.game_name}
            onChange={handleInputChange}
            name="game_name"
          />
          <TextField
            id="date"
            label="Release date"
            type="date"
            variant="filled"
            className="textInputs"
            placeholder="Release date"
            value={formData.release_date}
            onChange={handleInputChange}
            name="release_date"
            style={{ width: 220 }}
          />
          <br />
          <TextField
            label="Categories"
            type="text"
            variant="filled"
            className="textInputs"
            placeholder="Categories"
            value={formData.categories}
            onChange={handleInputChange}
            name="categories"
          />
          <TextField
            label="Platforms"
            type="text"
            variant="filled"
            className="textInputs"
            placeholder="Platforms"
            value={formData.platforms}
            onChange={handleInputChange}
            name="platforms"
          />
          <br />
          <TextField
            label="Developer"
            type="text"
            variant="filled"
            className="textInputs"
            placeholder="Developer"
            value={formData.developer}
            onChange={handleInputChange}
            name="developer"
          />
          <TextField
            label="Publisher"
            type="text"
            variant="filled"
            className="textInputs"
            placeholder="Publisher"
            value={formData.publisher}
            onChange={handleInputChange}
            name="publisher"
          />
          <br />
          <TextField
            label="Short description"
            type="text"
            variant="filled"
            className="textInputs"
            placeholder="Short description"
            value={formData.short_description}
            onChange={handleInputChange}
            name="short_description"
          />
          <TextField
            label="Image URL"
            type="text"
            variant="filled"
            className="textInputs"
            placeholder="Image URL"
            value={formData.image_url}
            onChange={handleInputChange}
            name="image_url"
          />
          <br />
          <TextField
            label="Rating"
            type="number"
            variant="filled"
            className="textInputs"
            placeholder="Rating"
            value={formData.rating}
            onChange={handleInputChange}
            name="rating"
          />
          <TextField
            label="Price"
            type="number"
            variant="filled"
            className="textInputs"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
            name="price"
          />
        </div>
        <div className="checkboxs">
          <div className="checkboxContainer">
            <Checkbox
              required
              color="warning"
              className="multiplayer"
              placeholder="Multiplayer"
              checked={formData.multiplayer === 1}
              onChange={handleInputChange}
              name="multiplayer"
            />
            <Typography variant="body2" className="checkboxLabel">
              Multiplayer
            </Typography>
          </div>
          <div className="checkboxContainer">
            <Checkbox
              required
              color="warning"
              className="modSupport"
              placeholder="Mod support"
              checked={formData.mod_support === 1}
              onChange={handleInputChange}
              name="mod_support"
            />
            <Typography variant="body2">Mod support</Typography>
          </div>
          <div className="checkboxContainer">
            <Checkbox
              required
              color="warning"
              className="achievements"
              placeholder="Achievements"
              checked={formData.achievements === 1}
              onChange={handleInputChange}
              name="achievements"
            />
            <Typography variant="body2">Achievements</Typography>
          </div>
          <div className="AddButton">
            <Button
              type="button"
              color="warning"
              variant="contained"
              onClick={addNewGame}>
              Add game <AddCircleOutline />
            </Button>
          </div>
        </div>
        <br /> <br />
      </div>
    </div>
  );
}

export default AddGame;
