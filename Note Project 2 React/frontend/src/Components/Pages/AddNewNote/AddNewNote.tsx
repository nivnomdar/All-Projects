import { useNavigate } from "react-router-dom";
import "./AddNewNote.css";
import { useState } from "react";
import Note from "../../modal/NoteModal";
import { notes } from "../../Redux/Store";
import axios from "axios";
import { addNoteAction } from "../../Redux/NoteReducer";

function AddNewNote(): JSX.Element {
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const navigate = useNavigate();

  const addNewNote = async () => {
    // let myNotes = JSON.parse(localStorage.getItem("notes") as any);

    // הפיכת התאריך והשעה לצורה הנכונה.
    const [year, month, day] = taskDate.split("-");
    const [hours, minutes] = taskTime.split(":");
    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hours}:${minutes}`;

    const newNote = new Note(
      notes.getState().notes.allNotes.length + 1,
      taskName,
      formattedDate,
      formattedTime
    );

    // localStorage.setItem("notes", JSON.stringify(myNotes)); // שמירה בלוקל סטוראז'.

    const id = (
      await axios.post("http://localhost:4000/api/v1/notes/addNote", newNote)
    ).data;
    newNote.id = +id;

    notes.dispatch(addNoteAction(newNote)); // שמירה ברידקס ובזיכרון
    navigate("/");
  };

  // איפוס הפורם
  const resetForm = () => {
    setTaskName("");
    setTaskDate("");
    setTaskTime("");
  };

  return (
    <div className="AddNewNote">
      <h1>Add New Note</h1>
      <hr />

      <div className="AddNewNoteForm">
        <input
          type="text"
          id="taskName"
          placeholder="What is my new task?"
          value={taskName}
          onChange={(args) => setTaskName(args.target.value)}
          required></input>
        <br />
        <br />
        <input
          type="date"
          id="taskDate"
          placeholder="Date"
          value={taskDate}
          onChange={(args) => setTaskDate(args.target.value)}
          required></input>
        <br />
        <br />
        <input
          type="time"
          id="taskTime"
          placeholder="Time"
          value={taskTime}
          onChange={(args) => setTaskTime(args.target.value)}
          required></input>
        <br />
        <br />
        <div
          className="btn-group"
          id="Buttons"
          role="group"
          aria-label="Basic outlined example">
          <button
            type="submit"
            value="Save"
            id="submitB"
            className="btn btn-primary"
            onClick={addNewNote}>
            Submit
          </button>
          <button
            type="reset"
            value="Reset"
            className="btn btn-danger"
            id="resetB"
            onClick={resetForm}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddNewNote;
