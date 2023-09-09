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
import authService from "../../Pages/Login/authService";
// import ProtectedRoute from "./ProtectedRoute";
import Favorites from "../../Pages/Favorites/Favorites";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MainRoute(): JSX.Element {
  // console.log("Is authenticated:", authService.isAuthenticated());
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status here and navigate accordingly
    if (authService.isAuthenticated()) {
      console.log(`Is authenticated (${authService.isAuthenticated()})`);
      // If authenticated, redirect to the home page
      navigate("/home");
    } else {
      // If not authenticated, redirect to the login page
      console.log(
        `Please login to continue (${authService.isAuthenticated()})`
      );

      navigate("/login");
    }
  }, []);

  return (
    <div className="MainRoute">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/About" element={<About />} />

        {authService.isAuthenticated() ? (
          <>
            <Route index element={<Games />} />
            <Route path="/home" element={<Games />} />
            <Route path="/adminHome" element={<AdminHome />} />
            <Route path="/addGame" element={<AddGame />} />
            <Route path="/editGame/:id" element={<EditGame />} />
            <Route path="/gameplayer/:id" element={<Player />} />
            <Route path="/favorites" element={<Favorites />} />

            <Route path="/search/:searchText" element={<SearchPage />} />
          </>
        ) : null}

        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default MainRoute;

{
  /* <Route
          path="/"
          element={
            authService.isAuthenticated() ? (
              <ProtectedRoute>
                <Route index element={<Games />} />
                <Route path="/home" element={<Games />} />
                <Route path="/adminHome" element={<AdminHome />} />
                <Route path="/addGame" element={<AddGame />} />
                <Route path="/editGame/:id" element={<EditGame />} />
                <Route path="/gameplayer/:id" element={<Player />} />
                <Route path="/search/:searchText" element={<SearchPage />} />
              </ProtectedRoute>
            ) : (
              <Navigate to="/login" />
            )
          }
        /> */
}
