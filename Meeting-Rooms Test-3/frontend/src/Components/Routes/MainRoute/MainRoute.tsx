import { Route, Routes } from "react-router-dom";
import "./MainRoute.css";
import Home from "../../Layout/Home/Home";
import AddForm from "../../Pages/addForm/addForm";
import Page404 from "../../Pages/Page404/Page404";

function MainRoute(): JSX.Element {
  return (
    <div className="MainRoute">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/AddForm" element={<AddForm />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default MainRoute;
