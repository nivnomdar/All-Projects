import { Link, useNavigate } from "react-router-dom";
import "./adminSingleItem.css";
// import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  ClearRounded,
  DeleteForeverOutlined,
  DeleteOutlineOutlined,
  EditNote,
  TrendingDown,
  TrendingUp,
} from "@mui/icons-material";
import Game from "../../../Modals/GameModal";
import axios from "axios";
import { gamesWeb } from "../../../Redux/Store";
import { deleteGameAction } from "../../../Redux/GamesReducer";

interface itemProps {
  game_id: number;
  game_name: string;
  release_date: string;
  categories: string;
  platforms: string;
  developer: string;
  publisher: string;
  short_description: string;
  rating: string;
  price: string;
  multiplayer: number;
  mod_support: number;
  achievements: number;
  image_url: string;
}

//test
function AdminSingleItem(props: itemProps): JSX.Element {
  const [selectedToDelete, setSelectedToDelete] = useState<Game | null>(null);
  const [openDialog, setOpenDialog] = useState<{ [key: number]: boolean }>({});
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();
  const goodRating = 8.5;

  const handleDeleteClick = (gameToDelete: Game) => {
    console.log(gameToDelete);
    setSelectedToDelete(gameToDelete);

    setOpenDialog((prevState) => ({
      ...prevState,
      [gameToDelete.game_id]: true,
    }));
  };

  // ביטול מחיקה מהמודל
  const handleCancelDelete = (game: Game) => {
    console.log("Canceled, game did not removed");
    console.log(selectedToDelete);
    setOpenDialog((prevState) => ({
      ...prevState,
      [game.game_id]: false,
    }));
    setSelectedToDelete(null);
  };

  const handleConfirmDelete = async (game: Game) => {
    const gameID = game.game_id;
    console.log(gameID);

    await axios.delete(`http://localhost:4000/api/Games/deleteById/${gameID}`);
    gamesWeb.dispatch(deleteGameAction(gameID)); // Dispatch delete action

    setOpenDialog((prevState) => ({
      ...prevState,
      [gameID]: false,
    }));
    gamesWeb.dispatch(deleteGameAction(gameID));
    console.log(game.game_name, "removed!");
    alert("Videogame removed!");
    setSelectedToDelete(null);
  };

  return (
    <Card className="card text-bg-dark" key={props.game_id}>
      {/* Card */}
      <div className="card_content">
        <CardMedia
          className="card_title"
          onClick={() => {
            <Link
              to={`/gamePlayer/${props.game_id}`}
              id="allGames"
              className="col-md-3"></Link>;
            navigate(`/gamePlayer/${props.game_id}`);
          }}>
          {props.game_name}
        </CardMedia>

        <CardMedia
          className="card_image"
          component="img"
          image={props.image_url}
          alt={props.game_name}
        />

        {/* Delete game Button */}
        <CardContent>
          <Button
            variant="outlined"
            color="warning"
            title="Delete game"
            onClick={() => handleDeleteClick(props)}>
            <DeleteForeverOutlined />
          </Button>
          <Button
            variant="outlined"
            color="primary"
            title="Edit game"
            onClick={() => navigate(`/editgame/${props.game_id}`)}>
            <EditNote />
          </Button>

          {/* Modal Title */}
          <Dialog
            open={openDialog[props.game_id] || false}
            onClose={() => handleCancelDelete(props)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle color="alert" id="alert-dialog-title">
              <b>{props.game_name}</b>
            </DialogTitle>

            {/* Modal Content */}
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <b>Are you sure you want to remove {props.game_name}?</b>
                <br /> <br />
                {props.publisher} || {props.rating}
                {parseFloat(props.rating) >= goodRating ? (
                  <TrendingUp color="success" />
                ) : (
                  <TrendingDown color="secondary" />
                )}
              </DialogContentText>
            </DialogContent>

            {/* Inside Modal Buttons */}
            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleCancelDelete(props)}>
                <ClearRounded />
              </Button>

              <Button
                variant="contained"
                color="error"
                onClick={() => handleConfirmDelete(props)}>
                <DeleteOutlineOutlined />
              </Button>
            </DialogActions>
          </Dialog>
        </CardContent>
      </div>
    </Card>
  );
}

export default AdminSingleItem;
