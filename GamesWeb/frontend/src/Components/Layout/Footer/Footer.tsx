import { GitHub } from "@mui/icons-material";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer(): JSX.Element {
  return (
    <div className="Footer">
      <div className="col Rights">All Rights belongs to Niv Nomdar</div>
      <div className="col GitLink">
        <Link to="https://github.com/nivnomdar?tab=repositories">
          <GitHub />
        </Link>
      </div>
    </div>
  );
}

export default Footer;
