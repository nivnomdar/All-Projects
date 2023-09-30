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
          // console.log(editForm.multiplayer);
        } catch (error) {
          console.log(error);
          alert(error);
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
        navigate("/home");
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
      <div className="inputs">
        <br />
        <div className="textFields">
          <TextField
            label="Game name"
            color="error"
            type="text"
            variant="filled"
            className="textInputs"
            placeholder="Game name"
            value={editForm.game_name}
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
            value={editForm.release_date}
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
            value={editForm.categories}
            onChange={handleInputChange}
            name="categories"
          />
          <TextField
            label="Platforms"
            type="text"
            variant="filled"
            className="textInputs"
            placeholder="Platforms"
            value={editForm.platforms}
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
            value={editForm.developer}
            onChange={handleInputChange}
            name="developer"
          />
          <TextField
            label="Publisher"
            type="text"
            variant="filled"
            className="textInputs"
            placeholder="Publisher"
            value={editForm.publisher}
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
            value={editForm.short_description}
            onChange={handleInputChange}
            name="short_description"
          />
          <TextField
            label="Image URL"
            type="text"
            variant="filled"
            className="textInputs"
            placeholder="Image URL"
            value={editForm.image_url}
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
            value={editForm.rating}
            onChange={handleInputChange}
            name="rating"
          />
          <TextField
            label="Price"
            type="number"
            variant="filled"
            className="textInputs"
            placeholder="Price"
            value={editForm.price}
            onChange={handleInputChange}
            name="price"
          />
        </div>
        <br />
        <div className="checkboxs">
          <div className="checkboxContainer">
            <Checkbox
              color="warning"
              className="multiplayer"
              placeholder="Multiplayer"
              checked={editForm.multiplayer === 1} // Set checked based on value
              onChange={handleInputChange}
              name="multiplayer"
            />
            <Typography variant="body2">Multiplayer</Typography>
          </div>
          <div className="checkboxContainer">
            <Checkbox
              color="warning"
              className="modSupport"
              placeholder="Mod support"
              checked={editForm.mod_support === 1} // Set checked based on value
              name="mod_support"
              onChange={handleInputChange}
            />
            <Typography variant="body2">Mod support</Typography>
          </div>
          <div className="checkboxContainer">
            <Checkbox
              color="warning"
              className="achievements"
              placeholder="Achievements"
              checked={editForm.achievements === 1}
              name="achievements"
              onChange={handleInputChange}
            />
            <Typography variant="body2">Achievements </Typography>
          </div>
        </div>
      </div>
      <br /> <br />
      <Button
        type="button"
        color="warning"
        variant="contained"
        onClick={handleEditGameButton}>
        Edit game <CheckCircleOutline />
      </Button>
      <br /> <br />
    </div>
  );
}

export default EditGame;
