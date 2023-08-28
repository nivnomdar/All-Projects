import { useParams } from "react-router-dom";
import "./Player.css";
import SingleItem from "../../Layout/Games/SingleItem/SingleItem";
import "bootstrap/dist/css/bootstrap.css";
import { useSelector } from "react-redux";
import { gamesWeb } from "../../Redux/Store";
import {
  CalendarMonthOutlined,
  CancelOutlined,
  Category,
  CheckCircleOutlined,
  Computer,
  Favorite,
  Groups,
  Notes,
  ThumbDown,
  ThumbUp,
  VideogameAsset,
  WorkspacePremium,
} from "@mui/icons-material";

function Player(): JSX.Element {
  const params = useParams();

  // מוודא שהאידי
  const { id } = params;
  if (!id) {
    return <input type="button" className="btn btn-dark" />;
  }

  const allgames = gamesWeb.getState().games.allGames; // Access games from the Redux store
  const Game = allgames.find((game) => game.game_id === Number(id));
  console.log("In player :", Game);

  if (!Game) {
    return <div>Loading...</div>;
  }

  return (
    <div className="player">
      <div className="card-title" title="Videogame name">
        {Game.game_name}
      </div>
      <div className="row">
        <div id="leftSide">
          <div className="Image">
            <img
              src={Game.image_url}
              className="card-img"
              alt={Game.game_name}
            />
          </div>
          <div className="card-text" id="Rating" title="Rating">
            <span className="info-label">Rating</span>
            <br />
            {Game.rating}
            {parseFloat(Game.rating) >= 8.5 ? (
              <ThumbUp color="success" />
            ) : parseFloat(Game.rating) >= 6.5 ? (
              <ThumbUp color="warning" />
            ) : (
              <ThumbDown color="error" />
            )}
          </div>
          <br />
          <div className="card-text" id="Like" title="Likes">
            <span className="info-label">Likes</span>
            <br />
            23 <Favorite color="error" />
          </div>
        </div>

        <div id="rightSide">
          <div className="info-box">
            <div className="info-icon" title="Release date">
              <div className="icon" id="date">
                <CalendarMonthOutlined color="warning" />
              </div>
              <div className="info-content">
                <p>{Game.release_date.split("T")[0]}</p>
              </div>
            </div>
          </div>
          <div className="info-box">
            <div className="info-icon" title="Categories">
              <div className="icon" id="categories">
                <Category color="warning" />
              </div>
              <div className="info-content">
                <p>{Game.categories}</p>
              </div>
            </div>
          </div>
          <div className="info-box">
            <div className="info-icon" id="platforms" title="Platforms">
              <div className="icon" id="platforms">
                <VideogameAsset color="warning" />
              </div>
              <div className="info-content">
                <p>{Game.platforms}</p>
              </div>
            </div>
          </div>
          <div className="info-box">
            <div className="info-icon" title="Short description">
              <div className="icon">
                <Notes color="warning" />
              </div>
              <div className="info-content">
                <p>{Game.short_description}</p>
              </div>
            </div>
          </div>
          <div className="info-box">
            <div className="info-icon" title="Developer - Publisher">
              <div className="icon" id="devPub">
                <Category color="warning" />
              </div>
              <div className="info-content">
                <p>
                  {Game.developer} {Game.publisher}
                </p>
              </div>
            </div>
          </div>
          <div className="checkboxes">
            <div className="info-checkboxes">
              <div className="info-icon" title="Multiplayer">
                <div className="icon">
                  <Groups color="primary" />
                </div>
                <div className="info-content">
                  <p>
                    {Game.multiplayer == 1 ? (
                      <CheckCircleOutlined color="success" />
                    ) : (
                      <CancelOutlined color="error" />
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="info-checkboxes">
              <div className="info-icon" title="Mod support">
                <div className="icon">
                  <Category color="primary" />
                </div>
                <div className="info-content">
                  <p>
                    {Game.mod_support == 1 ? (
                      <CheckCircleOutlined color="success" />
                    ) : (
                      <CancelOutlined color="error" />
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="info-checkboxes">
              <div className="info-icon" title="Achievements">
                <div className="icon">
                  <WorkspacePremium color="primary" />
                </div>
                <div className="info-content">
                  <p>
                    {Game.achievements == 1 ? (
                      <CheckCircleOutlined color="success" />
                    ) : (
                      <CancelOutlined color="error" />
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;
