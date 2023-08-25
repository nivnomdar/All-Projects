import { useEffect, useState } from "react";
import "./Notes.css";
import "bootstrap/dist/css/bootstrap.css";
import { notes } from "../../Redux/Store";
import axios from "axios";
import { deleteNoteAction, downloadNoteAction } from "../../Redux/NoteReducer";
import { Navigate, useNavigate } from "react-router-dom";

function Notes(): JSX.Element {
  const navigate = useNavigate();

  const [refresh, setRefresh] = useState(false);

  // interface itemProps {}

  // const myNotes = [
  //   {
  //     taskID: 1,
  //     taskName: "Finish my project",
  //     taskDate: "07/06/2023",
  //     taskTime: "08:00",
  //   },

  //   {
  //     taskID: 2,
  //     taskName: "Fix Menu",
  //     taskDate: "05/06/2023",
  //     taskTime: "20:00",
  //   },
  // ];
  // localStorage.setItem("notes", JSON.stringify(myNotes)); // שמירה בלוקל סטוראז'.

  // קבלת כל הדאטה מהבאקאנד
  useEffect(() => {
    if (notes.getState().notes.allNotes.length < 1) {
      axios
        .get("http://localhost:4000/api/v1/notes/listNotes")
        .then((response) => response.data)
        .then((result) => {
          notes.dispatch(downloadNoteAction(result));
        });
      setRefresh(true);
    }
  }, []);

  return (
    <div className="Notes">
      <div className="noteRow">
        {notes.getState().notes.allNotes.map((item) => (
          <div key={item.id} className="noteBody">
            <div className="name">{item.name}</div>
            <button
              type="button"
              className="btn-close btn-dark"
              id="xButton"
              onClick={() => {
                notes.dispatch(deleteNoteAction(item.id));
                navigate(`/noteDeleted/${item.name}`);
              }}></button>

            <div className="date">{item.date}</div>
            <div className="time">{item.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// <div
//   className="noteBody"
//   style={{ backgroundImage: `url("img/notebg.png")` }}>
//   <div className="card text-bg-dark col-4">
//     <div className="card-header">
//       {item.name}
//       <a
//         href="#"
//         className="btn btn-primary"
//         id="xButton"
//         style={{ width: 40 }}>
//         X
//       </a>
//     </div>
//     <div className="card-body">
//       <div className="card-title">{item.date}</div>
//       <div className="card-title">{item.time}</div>
//     </div>
//   </div>
// </div>
//       ))}
//     </div>
//   );
// }

export default Notes;
