import { Link, useParams } from "react-router-dom";
import "./noteDeleted.css";
import { useEffect } from "react";

function NoteDeleted(): JSX.Element {
  const params = useParams();

  return (
    <>
      <br />
      <div className="noteDeleted">
        <b>{params.name}</b> was deleted successfully
        <br />
        <br />
        <Link to="/">Return to your Notes</Link>
      </div>
    </>
  );
}

export default NoteDeleted;
