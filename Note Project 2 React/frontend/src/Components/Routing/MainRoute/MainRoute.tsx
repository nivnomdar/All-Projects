import { Route, Routes } from "react-router-dom";
import About from "../../Pages/About/About";
import MyFavorites from "../../Pages/MyFavorites/MyFavorites";
import Page404 from "../../Pages/Page404/Page404";
import "./MainRoute.css";
import AddNewNote from "../../Pages/AddNewNote/AddNewNote";
import Notes from "../../Layout/Notes/Notes";
import NoteDeleted from "../../Pages/noteDeleted/noteDeleted";

function MainRoute(): JSX.Element {
  return (
    <div className="MainRoute">
      <Routes>
        <Route path="/" element={<Notes />} />
        <Route path="/home" element={<Notes />} />
        <Route path="/AddNewNote" element={<AddNewNote />} />
        <Route path="/favorites" element={<MyFavorites />} />
        <Route path="/about" element={<About />} />
        <Route path="/noteDeleted/:name" element={<NoteDeleted />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default MainRoute;
