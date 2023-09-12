import { useEffect, useState } from "react";
import "./editGame.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Checkbox, TextField, Typography } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import { gamesWeb } from "../../Redux/Store";
import { updateGameAction } from "../../Redux/GamesReducer";
import Game from "../../Modals/GameModal";

function EditGame(): JSX.Element {
  const navigate = useNavigate();

  const [editForm, setEditForm] = useState({
    game_id: 0,
    game_name: "",
    release_date: new Date().toISOString().split("T")[0], // Set default value to today's date
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

  const params = useParams();
  const gameID = params.id ? parseInt(params.id) : 0; // Parse to integer or set a default value

  useEffect(() => {
    if (gameID !== 0) {
      const fetchGame = async () => {
        try {
          const response = await axios.get(
            `http://localhost:4000/api/Games/GameById/${gameID}`
          );
          // מקבל אלי את כל המידע על המשחק המבוקש
          const game: Game = response.data[0];
          console.log(game);

          // מסדר את התאריך (yyyy-mm-dd)
          const newRelease_date = game.release_date.split("T")[0];
          console.log(newRelease_date);

          // הצגת המידע באינפוטים
          setEditForm({
            ...editForm,
            game_id: game.game_id,
            game_name: game.game_name,
            release_date: newRelease_date,
            categories: game.categories,
            platforms: game.platforms,
            developer: game.developer,
            publisher: game.publisher,
            short_description: game.short_description,
            rating: game.rating,
            price: game.price,
            multiplayer: game.multiplayer,
            mod_support: game.mod_support,
            achievements: game.achievements,
            image_url: game.image_url,
          });
          console.log(editForm.multiplayer);
        } catch (error) {
          console.log(error);
        }
      };
      fetchGame();
    }
  }, [gameID]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;

    const newValue =
      event.target.type === "checkbox" ? (checked ? 1 : 0) : value;
    console.log(checked);

    setEditForm((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleEditGameButton = async () => {
    const updatedGame: Game = {
      game_id: gameID,
      game_name: editForm.game_name,
      release_date: editForm.release_date.split("T")[0],
      categories: editForm.categories,
      platforms: editForm.platforms,
      developer: editForm.developer,
      publisher: editForm.publisher,
      short_description: editForm.short_description,
      rating: editForm.rating,
      price: editForm.price,
      multiplayer: editForm.multiplayer,
      mod_support: editForm.mod_support,
      achievements: editForm.achievements,
      image_url: editForm.image_url,
    };
    console.log(gameID);
    console.log(updatedGame);

    await axios
      .put(`http://localhost:4000/api/Games/updateGame`, updatedGame)
      .then((response) => {
        console.log(response);
        gamesWeb.dispatch(updateGameAction(updatedGame));
        console.log("Game updataed successfully");
        alert("Game updataed successfully");
      })

      // navigate("/adminHome");
      .catch((error) => {
        console.log(error, "not working!");
        alert("Game did not update... please try again.");
      });
  };

  return (
    <div className="editGame">
      <Typography variant="h3" className="HeadLine">
        Edit: {editForm.game_name}
      </Typography>
      <br />
      <div className="textFields">
        <TextField
          type="text"
          variant="outlined"
          className="gameName"
          placeholder="Game name"
          value={editForm.game_name}
          onChange={handleInputChange}
          name="game_name"
        />
        <TextField
          type="text"
          variant="outlined"
          className="releaseDate"
          placeholder="Release date"
          value={editForm.release_date}
          onChange={handleInputChange}
          name="release_date"
        />
        <br />
        <TextField
          type="text"
          variant="outlined"
          className="categories"
          placeholder="Categories"
          value={editForm.categories}
          onChange={handleInputChange}
          name="categories"
        />
        <TextField
          type="text"
          variant="outlined"
          className="platforms"
          placeholder="Platforms"
          value={editForm.platforms}
          onChange={handleInputChange}
          name="platforms"
        />
        <br />
        <TextField
          type="text"
          variant="outlined"
          className="developer"
          placeholder="Developer"
          value={editForm.developer}
          onChange={handleInputChange}
          name="developer"
        />
        <TextField
          type="text"
          variant="outlined"
          className="publisher"
          placeholder="Publisher"
          value={editForm.publisher}
          onChange={handleInputChange}
          name="publisher"
        />
        <br />
        <TextField
          type="text"
          variant="outlined"
          className="shortDescription"
          placeholder="Short description"
          value={editForm.short_description}
          onChange={handleInputChange}
          name="short_description"
        />
        <TextField
          type="text"
          variant="outlined"
          className="imageURL"
          placeholder="Image URL"
          value={editForm.image_url}
          onChange={handleInputChange}
          name="image_url"
        />
        <br />
        <TextField
          type="number"
          variant="outlined"
          className="rating"
          placeholder="Rating"
          value={editForm.rating}
          onChange={handleInputChange}
          name="rating"
        />
        <TextField
          type="number"
          variant="outlined"
          className="price"
          placeholder="Price"
          value={editForm.price}
          onChange={handleInputChange}
          name="price"
        />
        <br />
        <Typography variant="body2">Multiplayer</Typography>
        <div className="checkboxs">
          <Checkbox
            color="warning"
            className="multiplayer"
            placeholder="Multiplayer"
            checked={editForm.multiplayer === 1} // Set checked based on value
            onChange={handleInputChange}
            name="multiplayer"
          />
          <Typography variant="body2">Mod support</Typography>
          <Checkbox
            color="warning"
            className="modSupport"
            placeholder="Mod support"
            checked={editForm.mod_support === 1} // Set checked based on value
            name="mod_support"
            onChange={handleInputChange}
          />
          <Typography variant="body2">
            Achievements
            <Checkbox
              color="warning"
              className="achievements"
              placeholder="Achievements"
              checked={editForm.achievements === 1}
              name="achievements"
              onChange={handleInputChange}
            />
          </Typography>
        </div>
      </div>
      <br /> <br />
      <Button
        type="button"
        color="success"
        variant="contained"
        onClick={handleEditGameButton}>
        <CheckCircleOutline />
      </Button>
      <br /> <br />
    </div>
  );
}

export default EditGame;
