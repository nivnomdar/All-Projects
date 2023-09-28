import { useNavigate } from "react-router-dom";
import "./SingleItem.css";
// import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Badge, Card, CardMedia, IconButton, Typography } from "@mui/material";

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
          className="card_image"
          component="img"
          image={props.image_url}
          alt={props.game_name}
          onClick={() => {
            navigate(`/gamePlayer/${props.game_id}`);
          }}
        />

        <div className="like_button">
          <IconButton onClick={() => handleLikeClick(props.game_id)}>
            {favoriteGames ? <FavoriteIcon color="error" /> : <FavoriteIcon />}
            <Badge
              color="secondary"
              badgeContent={likesCount[props.game_id] || 0}></Badge>
          </IconButton>
        </div>

        <div className="card_info">
          <CardMedia className="card_title">{props.game_name}</CardMedia>
          <Typography variant="inherit" className="card_platforms">
            {props.platforms}
          </Typography>
          <Typography
            variant="inherit"
            className="card_rating"
            style={{
              color:
                parseInt(props.rating) > 9
                  ? "darkgreen"
                  : parseInt(props.rating) > 8
                  ? "green"
                  : parseInt(props.rating) > 7
                  ? "lightgreen"
                  : parseInt(props.rating) > 6
                  ? "darkyellow"
                  : "red",
            }}>
            {props.rating}
          </Typography>

          <Typography variant="inherit" className="card_price">
            {props.price}$
          </Typography>
          <Typography variant="inherit" className="card_categories">
            {props.categories}
          </Typography>
        </div>
      </div>
    </Card>
  );
}
export default SingleItem;
