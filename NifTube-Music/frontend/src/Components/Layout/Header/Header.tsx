import { useState } from "react";
import { youtube } from "../../Redux/Store";
import "./Header.css";

function Header(): JSX.Element {
  const [totalSongs, setTotal] = useState(
    youtube.getState().songs.allSongs.length
  );
  const [totalCategories, setCategoriesTotal] = useState(
    youtube.getState().category.categories.length
  );

  youtube.subscribe(() => {
    setTotal(youtube.getState().songs.allSongs.length);
    setCategoriesTotal(youtube.getState().category.categories.length);
  });

  return (
    <div className="Header">
      <h1>Melody Tube</h1>
      Total Songs: {totalSongs} || Total Categories:{totalCategories}
    </div>
  );
}

export default Header;
