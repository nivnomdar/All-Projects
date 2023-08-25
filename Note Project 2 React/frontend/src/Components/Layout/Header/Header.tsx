import { useState } from "react";
import "./Header.css";
import { notes } from "../../Redux/Store";

function Header(): JSX.Element {
  const [totalNotes, setTotalNotes] = useState(
    notes.getState().notes.allNotes.length
  );

  notes.subscribe(() => {
    setTotalNotes(notes.getState().notes.allNotes.length);
  });

  return (
    <div className="Header">
      <h1>Notes</h1>
      Total Notes: {totalNotes} || Total Favorites: 0
    </div>
  );
}

export default Header;
