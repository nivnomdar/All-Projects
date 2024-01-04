import logo from "../../../assets/small-Image .jpeg";
import { Menu } from "lucide-react";
import { Button } from "../../Buttons/Button";

function PageHeader(): JSX.Element {
  return (
    <div className="flex gap-10 lg:gap-20 justify-between">
      {/* LEFT: Logo and left-modal */}
      <div className="flex gap-4 items-center flex-shrink-0">
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>

        <a href="/">
          <img
            src={logo}
            className="h-6"
            style={{ width: "100px", height: "auto" }}
          />
        </a>
      </div>

      {/* MIDDLE: Search input and button  */}

      <div></div>

      {/* RIGHT: Other buttons */}

      <div></div>
    </div>
  );
}

export default PageHeader;
