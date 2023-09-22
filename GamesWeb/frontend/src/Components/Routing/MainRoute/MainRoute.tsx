import { Route, Routes } from "react-router-dom";
import "./MainRoute.css";
import About from "../../Pages/About/About";
import Page404 from "../../Pages/Page404/Page404";
import Games from "../../Layout/Games/Games";
import Player from "../../Pages/Player/Player";
import AddGame from "../../Admin/addGame/addGame";
import AdminHome from "../../Admin/adminHome/adminHome";
import EditGame from "../../Admin/editGame/editGame";
import Register from "../../Pages/Register/Register";
import Login from "../../Pages/Login/Login";
import Favorites from "../../Pages/Favorites/Favorites";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MainRoute(): JSX.Element {
  // console.log("Is authenticated:", authService.isAuthenticated());
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status here and navigate accordingly
    // navigate("/login");
  }, []);

  return (
    <div className="MainRoute">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/About" element={<About />} />
        <Route index element={<Games />} />
        <Route path="/home" element={<Games />} />
        <Route path="/adminHome" element={<AdminHome />} />
        <Route path="/addGame" element={<AddGame />} />
        <Route path="/editGame/:id" element={<EditGame />} />
        <Route path="/gameplayer/:id" element={<Player />} />
        <Route path="/favorites" element={<Favorites />} />

        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default MainRoute;
