import { useNavigate, useParams } from "react-router-dom";
import "./SearchPage.css";
import { gamesWeb } from "../../Redux/Store";
import SingleItem from "../../Layout/Games/SingleItem/SingleItem";
import { useState } from "react";

function SearchPage(): JSX.Element {
  const { searchText } = useParams<{ searchText: string }>();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 12;

  let allGames = gamesWeb.getState().games.allGames;
  let filteredGames: any[] = [];

  // Filter logic
  if (searchText) {
    filteredGames = allGames.filter((game) =>
      game.game_name.toLowerCase().includes(searchText.toLowerCase())
    );

    console.log("Words entered:", searchText);
    console.log("Games found: ", filteredGames.length);
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationNumbers = () => {
    const totalPages = Math.ceil(filteredGames.length / gamesPerPage);

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
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);

  return (
    <div className="searchPage">
      <div className="row">
        {filteredGames.map((game: any) => (
          <div key={game.id} id="allGames" className="col-md-3">
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
              multiplayer={game["multiplayer"]}
              mod_support={game["mod_support"]}
              achievements={game["achievements"]}
              image_url={game["image_url"]}
              key={game["game_id"]}
            />
          </div>
        ))}
        <div className="pagination">{renderPaginationNumbers()}</div>
      </div>
    </div>
  );
}

export default SearchPage;
