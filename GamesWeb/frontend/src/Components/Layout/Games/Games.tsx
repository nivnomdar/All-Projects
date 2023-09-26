import { useEffect, useState } from "react";
import "./Games.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import SingleItem from "./SingleItem/SingleItem";
import { useNavigate } from "react-router-dom";
import { gamesWeb } from "../../Redux/Store";
import { downloadGamesAction } from "../../Redux/GamesReducer";
import Game from "../../Modals/GameModal";
import SearchFilters from "./SearchFilters/SearchFilters";

function Games(): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 12;
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (gamesWeb.getState().games.allGames.length === 0) {
      axios
        .get("http://localhost:4000/api/Games/allGames")
        .then((response) => response.data)
        .then((result) => {
          gamesWeb.dispatch(downloadGamesAction(result));

          console.log("Games loaded:", result.length);
          setAllGames(result);
        });
    } else {
      const allGames = gamesWeb.getState().games.allGames;
      console.log(allGames);
      setAllGames(allGames);
    }
  }, [allGames]);

  const unsubscribe = gamesWeb.subscribe(() => {
    // When the games state changes (e.g., due to searchGameAction),
    // update the filtered games state
    const filtered = gamesWeb.getState().games.allFilteredGames;
    setFilteredGames(filtered);
  });

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationNumbers = () => {
    // const totalPages = Math.ceil(filteredGames.length / gamesPerPage);

    const totalPages = Math.ceil(
      filteredGames.length > 0
        ? filteredGames.length / gamesPerPage
        : allGames.length / gamesPerPage
    );

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => handlePageChange(i + 1)}
          className={currentPage === i + 1 ? "active" : ""}>
          {i + 1}
        </button>
      ));
    } else {
      let startPage = Math.max(currentPage - 2, 1);
      let endPage = Math.min(startPage + 4, totalPages);

      if (currentPage === totalPages) {
        startPage = Math.max(currentPage - 4, 1);
        endPage = totalPages;
      }

      return Array.from({ length: endPage - startPage + 1 }, (_, i) => (
        <button
          key={startPage + i}
          onClick={() => handlePageChange(startPage + i)}
          className={currentPage === startPage + i ? "active" : ""}>
          {startPage + i}
        </button>
      ));
    }
  };

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;

  // אם אין חיפוש - תציג את כל המשחקים
  // אם יש חיפוש - תציג את המשחקים שחופשו
  const currentGames =
    filteredGames.length > 0
      ? filteredGames.slice(indexOfFirstGame, indexOfLastGame)
      : allGames.slice(indexOfFirstGame, indexOfLastGame);

  // const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);

  return (
    <div className="Games">
      <SearchFilters />
      <div className="row">
        {currentGames.map((game: Game) => (
          <div key={game.game_id} id="allGames" className="col-md-3">
            <SingleItem
              game_id={game["game_id"]}
              game_name={game["game_name"]}
              release_date={game["release_date"]}
              categories={game["categories"]}
              platforms={game["platforms"]}
              developer={game["developer"]}
              publisher={game["publisher"]}
              short_description={game["short_description"]}
              rating={game["rating"]}
              price={game["price"]}
              multiplayer={!!game["multiplayer"]}
              mod_support={!!game["mod_support"]}
              achievements={!!game["achievements"]}
              image_url={game["image_url"]}
              key={game["game_id"]}
            />
          </div>
        ))}
        <div className="pagination">{renderPaginationNumbers()}</div>
      </div>
      <br /> <br />
    </div>
  );
}

export default Games;
