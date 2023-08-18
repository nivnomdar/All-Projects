import { Link, useNavigate } from "react-router-dom";
import "./SingleItem.css";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";

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
  multiplayer: string;
  mod_support: string;
  achievements: string;
  image_url: string;
}

//test
function SingleItem(props: itemProps): JSX.Element {
  const [favoriteGames, setFavoriteGames] = useState(false);
  const navigate = useNavigate();

  const handleLikeClick = (gameID: number) => {
    setFavoriteGames(!favoriteGames);
    console.log("Liked:", props.game_id); // Toggle liked status on button click
  };

  return (
    <div className="SingleItem" key={props.game_id}>
      <div className="card text-bg-dark">
        <div
          className="card-title"
          onClick={() => {
            <Link
              to={`/gamePlayer/${props.game_id}`}
              id="allGames"
              className="col-md-3"></Link>;
            navigate(`/gamePlayer/${props.game_id}`);
          }}>
          {props.game_name}
        </div>
        <div className="LikeButton">
          <IconButton onClick={() => handleLikeClick(props.game_id)}>
            {favoriteGames ? <FavoriteIcon color="error" /> : <FavoriteIcon />}
          </IconButton>
        </div>
        <img
          src={props.image_url}
          className="card-img-top"
          alt={props.game_name}
        />
        <div className="card-body">
          <p className="card-text">Platform: {props.platforms}</p>
          <p className="card-text">Type: {props.categories}</p>
        </div>
        {/* Like button */}
      </div>
    </div>
  );
}

export default SingleItem;
