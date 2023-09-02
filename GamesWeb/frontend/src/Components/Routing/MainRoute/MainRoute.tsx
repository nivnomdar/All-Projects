import { Route, Routes } from "react-router-dom";
import "./MainRoute.css";
import About from "../../Pages/About/About";
import Page404 from "../../Pages/Page404/Page404";
import Games from "../../Layout/Games/Games";
import Player from "../../Pages/Player/Player";
import SearchPage from "../../Pages/SearchPage/SearchPage";
import AddGame from "../../Admin/addGame/addGame";
import AdminHome from "../../Admin/adminHome/adminHome";
import EditGame from "../../Admin/editGame/editGame";
import Register from "../../Pages/Register/Register";
import Login from "../../Pages/Login/Login";

function MainRoute(): JSX.Element {
  return (
    <div className="MainRoute">
      <Routes>
        <Route path="/" element={<Games />} />
        <Route path="/home" element={<Games />} />
        <Route path="/adminHome" element={<AdminHome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/gameplayer/:id" element={<Player />} />
        <Route path="/search/:searchText" element={<SearchPage />} />
        <Route path="/categories/:searchText" element={<SearchPage />} />
        <Route path="/addGame" element={<AddGame />} />
        <Route path="/editGame/:id" element={<EditGame />} />

        {/* <Route path="/" */}
        <Route path="/aboutUs" element={<About />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default MainRoute;
