import { Link, useNavigate } from "react-router-dom";
import "./SingleItem.css";
// import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Badge,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";

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
  multiplayer: boolean;
  mod_support: boolean;
  achievements: boolean;
  image_url: string;
}

//test
function SingleItem(props: itemProps): JSX.Element {
  const [favoriteGames, setFavoriteGames] = useState(false);
  const [likesCount, setLikesCount] = useState<{ [key: number]: number }>({}); // number of likes - מספר לייקים

  const navigate = useNavigate();

  const handleLikeClick = (gameID: number) => {
    setFavoriteGames(!favoriteGames);
    setLikesCount((prevLikes) => ({
      ...prevLikes,
      [gameID]: (prevLikes[gameID] || 0) + 1,
    }));

    console.log("Liked:", gameID); // Toggle liked status on button click
  };

  return (
    <Card className="card text-bg-dark" key={props.game_id}>
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

        <div className="like_button">
          <IconButton onClick={() => handleLikeClick(props.game_id)}>
            {favoriteGames ? <FavoriteIcon color="error" /> : <FavoriteIcon />}
            <Badge
              color="secondary"
              badgeContent={likesCount[props.game_id] || 0}></Badge>
          </IconButton>
        </div>

        <CardMedia
          className="card_image"
          component="img"
          image={props.image_url}
          alt={props.game_name}
        />

        <CardContent>
          <Typography variant="inherit">{props.platforms}</Typography>
          <Typography variant="inherit" color="green">
            {props.price}$
          </Typography>
          <Typography variant="inherit" color="white">
            {props.categories}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}

export default SingleItem;
